---
title: "Mapping ideological shifts : a discourse analysis of the far-right press in France, 1934-1944"
title_lang: "en"  # RGAA 8.7 — le titre est en anglais, le corps du billet est en français
date: 2025-06-27
draft: false
description: "Compte-rendu du lightning-talk M2 de Pia de Ladoucette par Chloé Jollivet-Courtois (M1) — analyse dynamique de topics et de réseaux sur 10 000 numéros de la presse d'extrême droite française sur une décennie de bouleversements politiques."
category: "compte-rendu"
event_tag: "Journée d'étude HN 2025"
author_m1: "Chloé Jollivet-Courtois"
subject_m2: "Pia de Ladoucette"
poster_title: "Mapping ideological shifts : a discourse analysis of the far-right press in France, 1934-1944"
image: "images/blog/je2025/pia-de-ladoucette/fig1.png"
type: "post"
---

<p class="actu-chapeau">
Compte-rendu par <strong>Chloé Jollivet-Courtois (M1)</strong> du lightning-talk de <strong>Pia de Ladoucette (M2)</strong> présenté lors de la journée d&rsquo;étude du master, 27 juin 2025 (séminaire de recherche 2024-2025, associé au colloque <em>Bridging Computational Humanities and Computational Social Sciences</em> organisé par AISSAI — Marie Puren et Florian Cafiero — et l&rsquo;ENC — Chahan Vidal-Gorène).</p>

Le 27 juin 2025, lors du séminaire de recherche du Master de l'ENC, Pia de Ladoucette a présenté les recherches portées dans son mémoire *Mapping ideological shifts : a discourse analysis of the far-right press in France, 1934-1944*.

## Contextualisation historique

La présentation débute par une contextualisation historique de l'objet d'étude. La période des années 1890-1914 incarne l'âge d'or de la presse, caractérisée par un développement rapide. L'influence de la presse devient un acteur social clé, c'est le début de la « presse de masse ». La Première Guerre mondiale bouleverse le champ politique, social et médiatique. La période des années 1920-1930 figure comme période de reconstruction suite à la guerre, avec un revirement de la presse vers une volonté éditoriale plus marquée à droite. Le travail de Pia de Ladoucette se penche sur la période 1934-1944, s'étendant de la crise de février 1934 — ayant engendré des mobilisations d'extrêmes droites — à la fin du régime de Vichy en 1944.

## Cadrage de l'objet d'étude

Définir les journaux d'*extrême droite* se révèle complexe en raison des évolutions des lignes éditoriales et des barrières idéologiques. La nature contestée et politisée de ce qualificatif rend l'objet plus difficile à définir. La recherche s'appuie sur une définition de l'extrême droite reposant sur les caractéristiques suivantes : anti-parlementarisme, autoritarisme, nationalisme, élitisme aristocratique, populisme et rhétorique propice aux crises (Chebel d'Appollonia, 1999).

## Question de recherche et objectifs

La question de recherche s'articule ainsi : « Comment les stratégies discursives et les tendances idéologiques ont-elles évolué dans la presse d'extrême droite française dans des temps de bouleversements politiques et sociaux ? »

Les principaux objectifs de l'étude sont :

- Explorer les dynamiques relationnelles des thèmes idéologiques dans un écosystème médiatique politiquement engagé
- Identifier les thèmes récurrents et les tendances idéologiques sur la période étudiée
- Évaluer l'impact de certains événements historiques (crise de février 1934, montée des régimes autoritaires en Europe, Seconde Guerre mondiale)
- Mettre en lumière les mécanismes de continuité et de rupture dans le discours

## Corpus

Les journaux sélectionnés sont issus de la campagne de digitalisation de la presse de *Gallica* (depuis 2006), de la plateforme de presse de la BnF *Retronews* et du projet *Europeana Newspapers* (2012-2015). La taille du corpus est de 10 637 numéros de journaux.

![Fig. 1 — Tableau des journaux sélectionnés dans le corpus de presse et leurs caractéristiques](/images/blog/je2025/pia-de-ladoucette/fig1.png)

![Fig. 2 — Chronologie des publications de journaux par année (1934-1944)](/images/blog/je2025/pia-de-ladoucette/fig2.png)

![Fig. 3 — Nombre d'articles par mois et par journal (1934-1944)](/images/blog/je2025/pia-de-ladoucette/fig3.png)

Le corpus a été prétraité en effectuant un nettoyage, une tokenization et une lemmatization. Les données ont également été séparées en 4 périodes temporelles afin de capturer les dynamiques.

## Approches computationnelles

Différentes approches computationnelles sont mobilisées :

**Dynamic Topic Modeling (Latent Dirichlet Allocation)** : utilisé pour découvrir des thèmes latents dans le corpus à travers le temps.

![Fig. 4 — Nuages de mots (1934-1936)](/images/blog/je2025/pia-de-ladoucette/fig4.png)

**Analyse structurale de réseau** : employée pour visualiser des co-occurrences thématiques. Les nœuds sont des concepts clés dérivés des topics LDA et les liens représentent la co-occurrence d'idées entre les articles ou journaux. Les réseaux sont des réseaux non dirigés, illustrant l'intersection mutuelle des discours. Les liens sont pondérés par la force des co-occurrences.

![Fig. 5 — Réseau de co-occurrence thématique par communautés (Louvain) — 1934-1936](/images/blog/je2025/pia-de-ladoucette/fig5.png)

**Métriques mesurées** :

- La centralité identifie les idées les plus influentes ou centrales
- Le coefficient de clustering mesure les interconnexions locales et reflète les cohésions idéologiques
- La modularité détecte des communautés thématiques ou des clusters idéologiques

![Fig. 6 — Tableau comparatif des différentes métriques des réseaux de co-occurrence thématique par périodes temporelles](/images/blog/je2025/pia-de-ladoucette/fig6.png)

## Résultats par périodes temporelles

**1934-1936** — Identification de clusters thématiques larges et divers, centrés sur les institutions politiques, les débats idéologiques et la montée des régimes fascistes. Les structures discursives sont fragmentées mais clairement organisées autour des idées fondatrices de l'extrême droite.

**1936-1939** — Émergence de clusters thématiques plus restreints autour de l'identité culturelle, l'antisémitisme et les conflits internationaux. L'augmentation de la cohérence reflète une consolidation de la rhétorique et une concentration grandissante de l'aspect idéologique.

**1939-1940** — Le réseau se rétrécit vers des topics plus interconnectés concentrés autour de l'expérience de guerre, le déplacement de civils et les problèmes territoriaux. Le discours devient plus centré, reflétant les réalités des périodes de guerre.

**1940-1944** — Les topics se centralisent et se militarisent, dominés par les thématiques de la hiérarchie militaire, la guerre au front et une idéologie collaborationniste. La modularité, plus faible, indique une idéologie plus unifiée. Les discours idéologiques *top-down* s'alignent avec la gouvernance de Vichy.

## Conclusion

Il ressort des noyaux idéologiques persistants autour du nationalisme, de la violence et de l'antisémitisme. On observe une évolution discursive : les réseaux thématiques reflètent le passage d'une fragmentation idéologique à une centralisation idéologique sous l'effet des pressions de la guerre et des réalignements politiques. Le discours s'adapte au contexte politique : la presse d'extrême droite a fait preuve d'une grande flexibilité discursive, s'adaptant à différents régimes, de la Troisième République à Vichy. L'analyse de réseaux a permis de suivre non seulement le contenu thématique mais aussi les transformations structurelles du discours.

## Poursuites envisagées

Une analyse comparative avec des journaux de gauche ou une comparaison transnationale au niveau européen.

## Bibliographie

- Ariane Chebel d'Appollonia, *L'extrême droite en France : De Maurras à Le Pen*, Paris, Éditions Complexes, 1996, p. 32-50.
