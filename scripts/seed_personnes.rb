require "date"
require "optparse"
require "yaml"
require_relative "publication_status"

module SeedPersonnes
  DEFAULT_PROFESSOR_FROM = "2025-09-01".freeze
  STUDENT_YEARS_BEFORE = 2
  STUDENT_START_MONTH_DAY = "09-01".freeze
  ALUMNI_START_MONTH_DAY = "09-01".freeze
  KNOWN_ALIASES = {
    "Alexandre Lionnet" => "Alexandre Lionnet-Rollin",
    "Marie Anna Puren" => "Marie Puren",
    "Katarzyna Anna Kapitan" => "Katarzyna Kapitan"
  }.freeze

  def self.generate(root, professor_from: DEFAULT_PROFESSOR_FROM,
                    student_years_before: STUDENT_YEARS_BEFORE,
                    student_start: STUDENT_START_MONTH_DAY,
                    alumni_start: ALUMNI_START_MONTH_DAY)
    Date.iso8601(professor_from)
    profiles = PublicationStatus.teacher_profiles(root)
    alumni_data = PublicationStatus.load_yaml(File.join(root, "data/fr/alumni.yml"))
    people = {}

    profiles.each do |profile|
      person = add_person(people, profile["id"], profile["name"], profile["idhal"])
      KNOWN_ALIASES.each do |variant, canonical|
        if PublicationStatus.normalize_name(canonical) == PublicationStatus.normalize_name(profile["name"])
          person["aliases"] << variant
        end
      end
      add_role(
        people.fetch(profile["id"]),
        "professor",
        professor_from
      )
    end

    Array(alumni_data["promotions"]).each do |promotion|
      year = Integer(promotion.fetch("annee"))
      student_from = "#{year - Integer(student_years_before)}-#{student_start}"
      alumni_from = "#{year}-#{alumni_start}"
      Array(promotion["alumni"]).each do |alumnus|
        name = [alumnus.fetch("prenom"), alumnus.fetch("nom")].join(" ")
        normalized = PublicationStatus.normalize_name(name)
        canonical = KNOWN_ALIASES.find do |variant, target|
          PublicationStatus.normalize_name(variant) == normalized ||
            PublicationStatus.normalize_name(target) == normalized
        end&.last || name
        person = find_person(people, canonical)
        id = person ? person["id"] : slug(name)
        add_person(people, id, canonical, alumnus["idhal"], name)
        person = people.fetch(id)
        add_role(person, "student", student_from, alumni_from)
        add_role(person, "alumni", alumni_from)
      end
    end

    people.keys.sort.each_with_object({}) do |id, result|
      person = people.fetch(id)
      person["aliases"] = person["aliases"].uniq.sort
      person["roles"] = person["roles"].uniq.sort_by { |role| [role["from"], role["status"], role["to"].to_s] }
      result[id] = person
    end
  end

  def self.merge_existing(generated, existing)
    result = existing.each_with_object({}) { |(id, person), map| map[id] = person }
    generated.each do |id, person|
      current = result[id]
      if current
        current["name"] ||= person["name"]
        current["aliases"] = (Array(current["aliases"]) + Array(person["aliases"])).uniq.sort
        current["roles"] = (Array(current["roles"]) + Array(person["roles"])).uniq
        current["idhal"] ||= person["idhal"]
      else
        current = person
        result[id] = current
      end
      current["id"] = id
      current.delete("idhal") if current["idhal"].to_s.empty?
      current["roles"] = Array(current["roles"]).uniq.sort_by { |role| [role["from"], role["status"], role["to"].to_s] }
    end
    result.keys.sort.each_with_object({}) { |id, map| map[id] = result[id] }
  end

  def self.write_registry(path, registry)
    File.write(path, "# Personnes et périodes de rôle utilisées pour figer les statuts HAL.\n" \
                     "# Régénérer/compléter avec ruby scripts/seed_personnes.rb, puis relire les dates et alias.\n" \
                     "#{YAML.dump(registry)}")
  end

  def self.add_person(people, id, name, idhal = nil, alias_name = nil)
    person = people[id] ||= { "id" => id, "name" => name, "aliases" => [], "roles" => [] }
    if person["name"] != name
      person["aliases"] << name
    end
    person["aliases"] << alias_name if alias_name && PublicationStatus.normalize_name(alias_name) != PublicationStatus.normalize_name(person["name"])
    unless idhal.to_s.strip.empty?
      if person["idhal"] && person["idhal"] != idhal
        warn "IDHAL contradictoires pour #{person['name']}: #{person['idhal']} / #{idhal}"
      else
        person["idhal"] = idhal
      end
    end
    person
  end

  def self.add_role(person, status, from, to = nil)
    role = { "status" => status, "from" => from }
    role["to"] = to if to
    person["roles"] << role
  end

  def self.find_person(people, name)
    key = PublicationStatus.normalize_name(name)
    people.values.find do |person|
      [person["name"], *Array(person["aliases"])].any? do |candidate|
        PublicationStatus.normalize_name(candidate) == key
      end
    end
  end

  def self.slug(name)
    value = name.downcase.gsub(/[œæßł]/, "œ" => "oe", "æ" => "ae", "ß" => "ss", "ł" => "l").unicode_normalize(:nfkd)
    value.gsub(/\p{Mn}/, "").gsub(/[^a-z0-9]+/, "-").gsub(/\A-|-+\z/, "")
  end
end

if $PROGRAM_NAME == __FILE__
  root = File.expand_path("..", __dir__)
  options = {
    professor_from: SeedPersonnes::DEFAULT_PROFESSOR_FROM,
    student_years_before: SeedPersonnes::STUDENT_YEARS_BEFORE,
    student_start: SeedPersonnes::STUDENT_START_MONTH_DAY,
    alumni_start: SeedPersonnes::ALUMNI_START_MONTH_DAY
  }
  OptionParser.new do |parser|
    parser.banner = "Usage: ruby scripts/seed_personnes.rb [options]"
    parser.on("--professor-from DATE", "Date par défaut du statut professor (#{options[:professor_from]})") { |value| options[:professor_from] = value }
    parser.on("--student-years-before N", Integer, "Nombre d'années avant la promotion (#{options[:student_years_before]})") { |value| options[:student_years_before] = value }
    parser.on("--student-start MM-DD", "Début du statut student (#{options[:student_start]})") { |value| options[:student_start] = value }
    parser.on("--alumni-start MM-DD", "Début du statut alumni (#{options[:alumni_start]})") { |value| options[:alumni_start] = value }
  end.parse!

  path = File.join(root, "data/personnes.yml")
  generated = SeedPersonnes.generate(root, **options)
  existing = File.exist?(path) ? PublicationStatus.load_yaml(path) : {}
  registry = SeedPersonnes.merge_existing(generated, existing)
  SeedPersonnes.write_registry(path, registry)
  puts "#{registry.length} personnes dans #{path}"
  puts "Vérifier manuellement les rôles, dates, alias et conflits d'IDHAL avant publication."
end
