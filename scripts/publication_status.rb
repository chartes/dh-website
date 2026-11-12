require "date"
require "json"
require "net/http"
require "uri"
require "yaml"

module PublicationStatus
  HAL_ENDPOINT = "https://api.archives-ouvertes.fr/search/".freeze
  HAL_FIELDS = "halId_s,authFullName_s,authIdHal_s,producedDate_s,producedDateY_i".freeze
  STATUSES = %w[alumni professor student].freeze

  def self.load_yaml(path)
    YAML.safe_load(
      File.read(path),
      permitted_classes: [Date, Time],
      aliases: true
    ) || {}
  end

  def self.front_matter(path)
    contents = File.read(path)
    match = contents.match(/\A---\s*\r?\n(.*?)\r?\n---(?:\s*\r?\n|\z)/m)
    raise "Front matter YAML manquant dans #{path}" unless match

    YAML.safe_load(
      match[1],
      permitted_classes: [Date, Time],
      aliases: true,
      filename: path
    ) || {}
  end

  def self.teacher_profiles(root)
    Dir.glob(File.join(root, "content/french/teacher/*.md")).sort.map do |path|
      next if File.basename(path, ".md") == "_index"

      profile = front_matter(path)
      next unless profile["type"] == "teacher" && profile["master_teacher"] == true

      {
        "id" => File.basename(path, ".md"),
        "name" => profile.fetch("title"),
        "idhal" => profile["idhal"].to_s.strip
      }
    end.compact
  end

  def self.hal_query(teachers)
    ids = teachers.map do |person|
      person["idhal"] unless person["idhal"].empty?
    end.compact
    names = teachers.map do |person|
      person["name"] if person["idhal"].empty?
    end.compact
    clauses = []
    clauses << "authIdHal_s:(#{ids.map { |id| %("#{escape_solr(id)}") }.join(' OR ')})" unless ids.empty?
    clauses << "authFullName_t:(#{names.map { |name| %("#{escape_solr(name)}") }.join(' OR ')})" unless names.empty?
    raise "Aucun profil d’équipe master_teacher trouvé" if clauses.empty?

    clauses.join(" OR ")
  end

  def self.escape_solr(value)
    value.gsub("\\", "\\\\\\").gsub('"', '\\"')
  end

  def self.fetch_hal_documents(teachers)
    query = URI.encode_www_form(
      "q" => hal_query(teachers),
      "fl" => HAL_FIELDS,
      "sort" => "producedDate_s desc",
      "rows" => "2000",
      "wt" => "json"
    )
    uri = URI("#{HAL_ENDPOINT}?#{query}")
    request = Net::HTTP::Get.new(uri)
    request["User-Agent"] = "chartes-dh-website-publication-snapshot/1.0"
    response = Net::HTTP.start(
      uri.host,
      uri.port,
      use_ssl: uri.scheme == "https",
      open_timeout: 20,
      read_timeout: 120
    ) { |http| http.request(request) }
    raise "HAL a répondu HTTP #{response.code}: #{response.message}" unless response.is_a?(Net::HTTPSuccess)

    JSON.parse(response.body).fetch("response").fetch("docs")
  end

  def self.normalize_name(value)
    value.to_s
      .downcase
      .gsub(/[œæßł]/, "œ" => "oe", "æ" => "ae", "ß" => "ss", "ł" => "l")
      .unicode_normalize(:nfkd)
      .gsub(/\p{Mn}/, "")
      .gsub(/[^a-z0-9]+/, " ")
      .split
      .sort
      .join(" ")
  end

  class Registry
    def initialize(data)
      @people = data.values
      @by_idhal = Hash.new { |hash, key| hash[key] = [] }
      @by_name = Hash.new { |hash, key| hash[key] = [] }
      @by_alias = Hash.new { |hash, key| hash[key] = [] }

      @people.each do |person|
        idhal = person["idhal"].to_s.strip.downcase
        @by_idhal[idhal] << person unless idhal.empty?
        @by_name[PublicationStatus.normalize_name(person["name"])] << person
        Array(person["aliases"]).each do |name|
          @by_alias[PublicationStatus.normalize_name(name)] << person
        end
      end
    end

    def match(name, idhal)
      identifier = idhal.to_s.strip.downcase
      return unique(@by_idhal[identifier]) unless identifier.empty? || @by_idhal[identifier].empty?

      key = PublicationStatus.normalize_name(name)
      named = unique(@by_name[key])
      return named if named
      return nil unless @by_name[key].empty?

      unique(@by_alias[key])
    end

    def statuses(person, date)
      return [] unless person

      Array(person["roles"]).map do |role|
        from = Date.iso8601(role.fetch("from"))
        to = role["to"] && Date.iso8601(role["to"])
        role["status"] if from <= date && (to.nil? || date < to)
      end.compact.uniq.sort
    end

    private

    def unique(matches)
      matches.length == 1 ? matches.first : nil
    end
  end

  def self.base_hal_id(document)
    value = document["halId_s"].to_s
    raise "Notice HAL sans halId_s : #{document.inspect}" if value.empty?

    value.sub(/v\d+\z/, "")
  end

  def self.publication_date(document)
    value = Array(document["producedDate_s"]).first.to_s
    unless value.empty?
      begin
        return [Date.iso8601(value[0, 10]), false]
      rescue ArgumentError
        # Fall back to the HAL publication year below.
      end
    end

    year = Array(document["producedDateY_i"]).first
    return [Date.new(Integer(year), 1, 1), true] if year

    [nil, true]
  rescue ArgumentError
    [nil, true]
  end

  def self.snapshot_entry(document, registry)
    reference_date, fallback = publication_date(document)
    names = Array(document["authFullName_s"])
    ids = Array(document["authIdHal_s"])
    unknown = []
    authors = names.each_with_index.map do |name, index|
      person = registry.match(name, ids[index])
      unknown << name unless person
      {
        "name" => name,
        "person" => person && person["id"],
        "status" => reference_date ? registry.statuses(person, reference_date) : []
      }
    end
    statuses = authors.flat_map { |author| author["status"] }.uniq.sort

    [
      { "authors" => authors, "statuses" => statuses },
      {
        "unknown_authors" => unknown,
        "date_fallback" => fallback && reference_date,
        "date_missing" => fallback && reference_date.nil?
      }
    ]
  end

  def self.add_missing_snapshots(existing, documents, registry)
    result = existing.dup
    metrics = { "processed" => 0, "unknown_authors" => [], "date_fallbacks" => [], "date_missing" => [] }

    documents.each do |document|
      id = base_hal_id(document)
      next if result.key?(id)

      entry, detail = snapshot_entry(document, registry)
      result[id] = entry
      metrics["processed"] += 1
      metrics["unknown_authors"].concat(detail["unknown_authors"])
      metrics["date_fallbacks"] << id if detail["date_fallback"]
      metrics["date_missing"] << id if detail["date_missing"]
    end

    [result, metrics]
  end
end
