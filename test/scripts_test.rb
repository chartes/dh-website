require "minitest/autorun"
require_relative "../scripts/publication_status"
require_relative "../scripts/seed_personnes"

class PublicationStatusTest < Minitest::Test
  def test_normalizes_accents_and_reordered_name_tokens
    assert_equal(
      PublicationStatus.normalize_name("Lucas Noëmie"),
      PublicationStatus.normalize_name("Noëmie Lucas")
    )
  end

  def test_calculates_overlapping_roles_and_excludes_end_date
    person = {
      "id" => "noemie-lucas",
      "roles" => [
        { "status" => "professor", "from" => "2020-01-01" },
        { "status" => "student", "from" => "2024-09-01", "to" => "2026-09-01" },
        { "status" => "alumni", "from" => "2026-09-01" }
      ]
    }
    registry = PublicationStatus::Registry.new("noemie-lucas" => person)

    assert_equal %w[professor student], registry.statuses(person, Date.new(2025, 1, 1))
    assert_equal %w[alumni professor], registry.statuses(person, Date.new(2026, 9, 1))
  end

  def test_falls_back_to_january_first_when_hal_date_is_missing_or_invalid
    date, fallback = PublicationStatus.publication_date(
      "producedDate_s" => "date-invalide",
      "producedDateY_i" => 2025
    )

    assert_equal Date.new(2025, 1, 1), date
    assert fallback
    assert_equal [nil, true], PublicationStatus.publication_date({})
  end

  def test_snapshot_addition_is_idempotent_and_does_not_replace_existing_entry
    registry = PublicationStatus::Registry.new(
      "noemie-lucas" => {
        "id" => "noemie-lucas",
        "name" => "Noëmie Lucas",
        "roles" => [{ "status" => "student", "from" => "2024-09-01" }]
      }
    )
    documents = [
      {
        "halId_s" => "hal-123v2",
        "authFullName_s" => ["Lucas Noëmie", "Auteur Inconnu"],
        "authIdHal_s" => ["", ""],
        "producedDate_s" => "2025-01-01"
      }
    ]
    original = { "hal-fixed" => { "override" => ["professor"], "statuses" => [] } }

    first, first_metrics = PublicationStatus.add_missing_snapshots(original, documents, registry)
    second, second_metrics = PublicationStatus.add_missing_snapshots(first, documents, registry)

    assert_equal original["hal-fixed"], first["hal-fixed"]
    assert first.key?("hal-123")
    assert_equal first, second
    assert_equal 1, first_metrics["processed"]
    assert_equal 0, second_metrics["processed"]
    assert_equal 1, first_metrics["unknown_authors"].length
  end

  def test_seed_merges_team_and_alumni_roles_and_keeps_known_name_aliases
    root = File.expand_path("..", __dir__)
    person = SeedPersonnes.generate(root).fetch("alexandre-lionnet")
    statuses = person["roles"].map { |role| role["status"] }.uniq.sort

    assert_equal %w[alumni professor student], statuses
    assert_includes person["aliases"], "Alexandre Lionnet"
  end
end
