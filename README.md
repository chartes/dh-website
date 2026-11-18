# Digital humanities @ Chartes

Site Hugo du master Humanités numériques de l'École nationale des chartes-PSL.
Ce ```README.md``` est destiné aux personnes qui veulent modifier le site.

## Démarrage rapide

Cloner le dépôt avec son thème, qui est lui même un sous-module Git et l'afficher en local :

```sh
# 1. Récupérer le dépôt et le thème
git clone --recurse-submodules  git@github.com:chartes/dh-website.git
cd dh-website

# 2. Vérifier qu'une version Extended de Hugo est installée
hugo version

# 3. Installer les dépendances JavaScript
npm install

# 4. Lancer le site en local
npm run dev
```

> Si la commande ```hugo``` n’existe pas, installe Hugo Extended avant de continuer. Sur macOS avec Homebrew : brew install hugo.

Si le dépôt est déjà cloné :

```sh
git submodule update --init --recursive
```

Pour visualiser le site, copie l'adresse indiquée par Hugo dans ton navigateur, en général
`http://localhost:1313/`.


Commandes courantes :

```sh
npm run dev       # serveur local
npm run build     # build complet et minifié
ruby test/scripts_test.rb  # optionnel : vérifie que les données dans data/ sont correctement normalisées 
```

## Organisation du dépôt

| Élément | Ce qu'il contient | Pourquoi il existe |
| --- | --- | --- |
| `content/french/` | Les pages et contenus Markdown : actualités, événements, projets, publications, équipe, alumni, etc. | C'est la source des textes et des informations éditoriales affichés sur le site. |
| `layouts/` | Les gabarits HTML et les partials propres au site. | Ces fichiers définissent la structure et l'affichage des pages ; ils peuvent surcharger le thème. |
| `assets/` | Les fichiers SCSS, JavaScript et certaines images traités par Hugo Pipes. | Ces ressources sont transformées et intégrées au site lors du build. |
| `static/` | Les fichiers copiés tels quels, comme les logos, images et ressources publiques. | Ce dossier sert aux fichiers qui doivent être affichés tels quels, sans redimensionnement ni compression. |
| `data/` | Les données structurées utilisées par les gabarits et les scripts : alumni, personnes et instantanés HAL. | Il sépare les données réutilisables du contenu des pages et permet de les traiter automatiquement. |
| `config/_default/` | La configuration organisée par domaine, notamment les langues, les menus et le module Hugo. | Il regroupe les réglages Hugo qui ne concernent pas directement le contenu des pages. |
| `hugo.toml` | La configuration principale : domaine, permaliens, paramètres, plugins et options de build. | Il définit le comportement général du site et de sa construction. |
| `scripts/` | Les scripts Ruby de préparation et de mise à jour des données HAL. | Ils automatisent la génération du registre des personnes et des instantanés de publications. |
| `test/` | Les tests des scripts Ruby. | Ils vérifient que la logique de normalisation, de rôles et de statuts HAL fonctionne correctement. |
| `.github/workflows/` | Les workflows d'automatisation GitHub Pages et de mise à jour des statuts HAL. | Ils exécutent automatiquement les builds, les tests et les mises à jour planifiées. |
| `themes/educenter-hugo/` | Le thème Educenter, fourni comme sous-module Git externe. | Il fournit la base graphique et les gabarits génériques du site ; il ne faut pas le modifier directement. |
| `public/`, `resources/` | Les fichiers générés localement par Hugo. | Ce sont des sorties de build, pas des sources à modifier manuellement. |

## Où faire une modification ?

| Besoin | Dossier ou fichier à utiliser |
| --- | --- |
| Modifier une page ou une fiche | `content/french/` |
| Modifier la structure HTML d'une page | `layouts/` |
| Modifier un composant commun, comme le menu ou le footer | `layouts/partials/` |
| Modifier l'affichage d'un type de contenu | `layouts/teacher/`, `layouts/event/`, `layouts/projects/`, etc. |
| Modifier le style ou le JavaScript du site | `assets/` |
| Ajouter une ressource servie telle quelle | `static/` |
| Modifier un menu, une langue ou un paramètre | `config/_default/` ou `hugo.toml` |
| Modifier les personnes, promotions ou statuts HAL | `data/`, en respectant les règles ci-dessous |

Ne modifie pas directement `themes/educenter-hugo/`. C'est un sous-module externe,
et les personnalisations locales doivent rester dans les surcharges du dépôt
principal. Une évolution du thème se fait en mettant à jour la référence du
sous-module, après vérification du site.

## Données HAL et publications

La page Publications utilise les fiches `master_teacher` de
`content/french/teacher/` et les promotions de `data/fr/alumni.yml` pour alimenter
`data/personnes.yml` :

```sh
ruby scripts/seed_personnes.rb
```

Le script conserve les entrées existantes, mais il peut ajouter des personnes,
alias et périodes. Relire manuellement les dates, rapprochements et conflits d'IDHAL
avant de valider le fichier. Le rôle `professor` commence par défaut le
`2025-09-01` et peut être réglé avec `--professor-from`. Les périodes `student`
commencent deux ans avant l'année de promotion, au 1er septembre ; le rôle `alumni`
commence à cette même rentrée.

Pour ajouter les statuts des nouvelles notices HAL :

```sh
ruby scripts/snapshot_status.rb # ajoute les nouvelles publications HAL dans publications_status.json
ruby test/scripts_test.rb
```

Le script nécessite un accès réseau à HAL et ajoute les nouveaux identifiants à
`data/publication_status.json` sans remplacer les instantanés existants. Les
corrections manuelles se font dans `data/personnes.yml` ou avec le champ `override`
d'une notice. Les dates de fin de rôle sont exclusives : le statut suivant prend
effet à sa date `from`.

Le workflow `publication-status.yml` exécute ce traitement chaque lundi à 06:17 UTC
et peut aussi être lancé manuellement. Il ouvre une pull request lorsque le snapshot
change.

## Particularités à connaître

- Le site est actuellement monolingue français : les contenus sont sous
	`content/french/` et l'anglais est désactivé.

- `baseURL` et `params.site_url` doivent rester cohérents dans `hugo.toml`. Ils
	servent notamment aux informations visibles lorsqu'une personne partage l'URL du site sur les réseaux sociaux et à indiquer aux moteurs de recherche l'URL officielle de la page.


- Les paramètres d'accessibilité dans `hugo.toml` doivent rester synchronisés avec
	`content/french/accessibilite/_index.md`.
- `public/` et `resources/` sont des résultats de build. Pour repartir d'un état
	propre, supprime-les puis relance Hugo plutôt que de les éditer.

## Vérification avant une pull request

1. Lancer `npm run build`.
2. Lancer `ruby test/scripts_test.rb` si les scripts ou les données HAL ont changé.
3. Vérifier le rendu avec `npm run dev`, notamment les liens, les dates de contenu,
	 les images et l'accessibilité.
4. Vérifier que le sous-module est initialisé et qu'aucune modification locale n'a
	 été faite dans `themes/educenter-hugo/` par inadvertance.
