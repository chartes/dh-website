---
title: "Analyzing Electoral Manifesto Discourse: The Case of Legislative Elections in Two French Départements, 1958–1986"
title_lang: "en"  # RGAA 8.7 — le titre est en anglais, le corps du billet est en français
date: 2025-06-27
draft: false
description: "Compte-rendu du lightning-talk M2 de Charlie Lezin par Damien Conceicao (M1) — analyse du degré de personnalisation du discours dans les professions de foi des candidats aux législatives en Eure-et-Loir et Loir-et-Cher."
category: "compte-rendu"
event_tag: "Journée d'étude HN 2025"
author_m1: "Damien Conceicao"
subject_m2: "Charlie Lezin"
poster_title: "Analyzing Electoral Manifesto Discourse: The Case of Legislative Elections in Two French Départements, 1958–1986"
image: "images/blog/je2025/charlie-lezin/fig1.png"
type: "post"
---

<p class="actu-chapeau">
Compte-rendu par <strong>Damien Conceicao (M1)</strong> du lightning-talk de <strong>Charlie Lezin (M2)</strong> présenté lors de la journée d&rsquo;étude du master, 27 juin 2025 (séminaire de recherche 2024-2025, associé au colloque <em>Bridging Computational Humanities and Computational Social Sciences</em> organisé par AISSAI — Marie Puren et Florian Cafiero — et l&rsquo;ENC — Chahan Vidal-Gorène).</p>

Dans son mémoire « *Analyzing Electoral Manifesto Discourse: The Case of Legislative Elections in Two French Départements, 1958–1986* », Charlie se propose d'étudier le discours des candidats dans les professions de foi avec un focus sur le degré de personnalisation du discours.

Le jeu de données se compose de 303 professions de foi des 285 candidats des élections législatives des départements de l'Eure-et-Loir et du Loir-et-Cher aux élections de 1958 à 1981. Chaque document représente un candidat et un suppléant et est composé de paratexte, d'une salutation et du discours. L'analyse se concentre sur l'étude des salutations et du discours.

![Fig. 1 — Composition du jeu de données](/images/blog/je2025/charlie-lezin/fig1.png)

<details class="figure-desc">
<summary>Description détaillée de la figure 1</summary>

Reproduction d'une profession de foi électorale de 1962, annotée pour montrer le
découpage retenu dans le corpus. Quatre étiquettes désignent les zones du document :
« Paratext 1 » pour l'en-tête et les portraits des candidats, « Salutation » pour la
formule d'adresse, « Discourse » pour le corps du texte, et « Paratext 2 » pour le
bloc de signature.

</details>

Le degré de personnalisation se définit par l'utilisation de déterminants possessifs au lieu d'articles indéfinis mais aussi des références aux racines locales des candidats, à leur parti ainsi qu'à différents groupes socio-professionnels détectés grâce à la *Named Entity Recognition* (NER).

L'analyse des salutations montre un changement de pratique au début des années 1970 où les formules de salutation deviennent de plus en plus personnelles avec un net recul de l'utilisation des termes « *Électeurs/Électrices* » au profit de « *Madame/Monsieur* ».

![Fig. 2 — Évolution des formules de salutation vers une plus grande personnalisation](/images/blog/je2025/charlie-lezin/fig2.png)

<details class="figure-desc">
<summary>Description détaillée de la figure 2</summary>

Graphique en courbes portant les années en abscisse (de 1958 à 1981) et un pourcentage
en ordonnée (de 0 à plus de 90 %). Cinq courbes suivent chacune une formule de
salutation : « Électeurs », « Madame/Monsieur », « Concitoyens », « Compatriotes » et
« Citoyens ». La courbe « Électeurs » culmine vers 1967 puis décroît ; la courbe
« Madame/Monsieur », nulle au départ, devient la plus élevée à la fin de la période.

</details>

Charlie Lezin a en outre comparé le ratio entre l'utilisation des déterminants possessifs et des articles indéfinis dans les professions de foi du premier tour pour chaque parti, ainsi que le degré d'individualisation des candidats en fonction du parti — c'est-à-dire le degré auquel le candidat se présente en tant qu'individu et se détache de son parti.

![Fig. 3 — Ratio possessifs/indéfinis et individualisation par parti](/images/blog/je2025/charlie-lezin/fig3.png)

<details class="figure-desc">
<summary>Description détaillée de la figure 3</summary>

Diagramme en barres horizontales intitulé « Classement Individualisation par Parti »,
portant en abscisse un score d'individualisation allant de −0,8 à +0,2. Onze partis
sont classés, avec l'effectif de leur corpus. Les scores négatifs, en rouge, vont du
PSU (−0,87) au RI (−0,13) ; les scores positifs, en vert, de l'UNR (+0,08) au RPR
(+0,24).

</details>

L'analyse a montré que les partis où les candidats utilisent le plus des marques de personnalisation sont aussi ceux qui ont un plus grand degré d'individualisation et, au contraire, les partis où les candidats utilisent le moins de marque de personnalisation du discours sont les partis où les candidats ont le plus petit score d'individualisation.
