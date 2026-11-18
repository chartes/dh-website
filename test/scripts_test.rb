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

  def test_aligns_idhal_with_authors_when_some_authors_have_none
    document = {
      "authFullName_s" => ["Arnaud Buhot", "Mirta Gordon", "Jean-Pierre Nadal"],
      "authIdHal_s" => ["arnaud-buhot", "jean-pierre-nadal"],
      "authFullNameIdHal_fs" => [
        "Arnaud Buhot_FacetSep_arnaud-buhot",
        "Mirta B. B. Gordon_FacetSep_",
        "Jean-Pierre Nadal_FacetSep_jean-pierre-nadal"
      ]
    }

    assert_equal ["arnaud-buhot", "", "jean-pierre-nadal"], PublicationStatus.author_idhals(document, 3)
    document.delete("authFullNameIdHal_fs")
    assert_equal ["", "", ""], PublicationStatus.author_idhals(document, 3)
  end

  def test_member_query_starts_at_master_entry_and_skips_theses
    registry = {
      "noemie-lucas" => {
        "id" => "noemie-lucas", "idhal" => "noemie-lucas",
        "roles" => [
          { "status" => "student", "from" => "2024-09-01", "to" => "2026-09-01" },
          { "status" => "alumni", "from" => "2026-09-01" }
        ]
      },
      "sans-idhal" => { "id" => "sans-idhal", "roles" => [{ "status" => "student", "from" => "2024-09-01" }] },
      "enseignant" => {
        "id" => "enseignant", "idhal" => "enseignant",
        "roles" => [{ "status" => "student", "from" => "2020-09-01" }, { "status" => "professor", "from" => "2025-09-01" }]
      }
    }
    members = PublicationStatus.member_profiles(registry)

    assert_equal [{ "id" => "noemie-lucas", "idhal" => "noemie-lucas", "from" => "2024-09-01" }], members
    assert_equal '(authIdHal_s:"noemie-lucas" AND producedDate_tdate:[2024-09-01T00:00:00Z TO *] NOT docType_s:MEM)',
                 PublicationStatus.member_clause(members.first)
    assert_includes PublicationStatus.hal_query([{ "name" => "A B", "idhal" => "a-b" }], members),
                    'authIdHal_s:("a-b") OR (authIdHal_s:"noemie-lucas"'
  end

  def test_members_without_idhal_use_hal_person_id
    roles = [{ "status" => "student", "from" => "2025-09-01", "to" => "2027-09-01" }]
    registry_data = {
      "thais-raffray" => { "id" => "thais-raffray", "name" => "Thaïs Raffray", "hal_id" => [1684517], "roles" => roles },
      "sans-compte" => { "id" => "sans-compte", "name" => "Sans Compte", "roles" => roles }
    }
    members = PublicationStatus.member_profiles(registry_data)

    assert_equal '(authIdPerson_i:(1684517) AND producedDate_tdate:[2025-09-01T00:00:00Z TO *] NOT docType_s:MEM)',
                 PublicationStatus.member_clause(members.find { |member| member["id"] == "thais-raffray" })
    assert_equal ["thais-raffray"], members.map { |member| member["id"] }

    registry = PublicationStatus::Registry.new(registry_data)
    document = {
      "halId_s" => "hal-05639241", "producedDate_s" => "2026-05-18",
      "authFullName_s" => ["T. Raffray", "Autre Personne"],
      "authFullNamePersonIDIDHal_fs" => ["T. Raffray_FacetSep_1684517_FacetSep_", "Autre Personne_FacetSep_0_FacetSep_"]
    }
    entry, = PublicationStatus.snapshot_entry(document, registry)

    assert_equal ["thais-raffray", nil], entry["authors"].map { |author| author["person"] }
    assert_equal ["student"], entry["statuses"]
  end
end
