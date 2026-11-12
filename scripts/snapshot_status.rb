require "optparse"
require_relative "publication_status"

if $PROGRAM_NAME == __FILE__
  root = File.expand_path("..", __dir__)
  options = { root: root }
  OptionParser.new do |parser|
    parser.banner = "Usage: ruby scripts/snapshot_status.rb [options]"
    parser.on("--root PATH", "Racine du dépôt") { |value| options[:root] = value }
  end.parse!

  root = options[:root]
  registry_path = File.join(root, "data/personnes.yml")
  snapshot_path = File.join(root, "data/publication_status.json")
  registry_data = PublicationStatus.load_yaml(registry_path)
  existing = File.exist?(snapshot_path) ? JSON.parse(File.read(snapshot_path)) : {}
  teachers = PublicationStatus.teacher_profiles(root)
  documents = PublicationStatus.fetch_hal_documents(teachers)
  registry = PublicationStatus::Registry.new(registry_data)
  result, metrics = PublicationStatus.add_missing_snapshots(existing, documents, registry)

  File.write(snapshot_path, JSON.pretty_generate(result.keys.sort.each_with_object({}) { |id, map| map[id] = result[id] }) + "\n")

  puts "Publications traitées : #{metrics['processed']}"
  puts "Auteurs non identifiés : #{metrics['unknown_authors'].length}"
  puts "Noms non identifiés les plus fréquents :"
  frequencies = Hash.new(0)
  metrics["unknown_authors"].each { |name| frequencies[name] += 1 }
  frequencies.sort_by { |name, count| [-count, name] }.first(20).each do |name, count|
    puts "  #{count}\t#{name}"
  end
  metrics["date_fallbacks"].each do |id|
    puts "Date HAL absente, utilisation de l'année au 01-01 : #{id}"
  end
  metrics["date_missing"].each do |id|
    puts "Date HAL et année absentes ; aucun statut calculé : #{id}"
  end
  puts "Snapshot écrit dans #{snapshot_path}"
end
