# dh-website

## Registre et instantanés HAL

La page Publications interroge HAL à la construction. Le filtre de profils s'appuie
sur `data/personnes.yml`, initialisé depuis les fiches `master_teacher` de
`content/french/teacher/` et les promotions de `data/fr/alumni.yml` :

```sh
ruby scripts/seed_personnes.rb
```

Le début par défaut du rôle `professor` est `2025-09-01` (configurable avec
`--professor-from`). Les périodes `student` commencent deux ans avant l'année de
promotion, au 1er septembre, et s'arrêtent à cette date de rentrée ; le rôle
`alumni` commence à cette même rentrée. Vérifier les dates, alias et rapprochements
générés à la main avant de compléter le registre.

Pour figer les statuts des nouvelles notices HAL sans toucher aux instantanés
existants :

```sh
ruby scripts/snapshot_status.rb
ruby test/scripts_test.rb
```

Les nouveaux identifiants sont ajoutés à `data/publication_status.json`. Une
exécution hebdomadaire ouvre une pull request ; les corrections manuelles se font
dans `data/personnes.yml` ou avec le champ `override` d'une notice. Les dates de fin
de rôle sont exclusives : le statut suivant prend effet à sa date `from`.
