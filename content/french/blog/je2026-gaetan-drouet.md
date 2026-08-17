---
title: "Spatio-temporal analysis of the suffix -(V)λ(λ)-"
title_lang: "en"  # RGAA 8.7 — le titre est en anglais, le corps du billet est en français
date: 2026-05-19
draft: false
description: "Compte-rendu du poster M2 de Gaëtan Drouet par Mathieu Rivière (M1) — spatialisation et historicisation d'un suffixe onomastique grec ancien."
category: "compte-rendu"
event_tag: "Journée d'étude HN 2026"
author_m1: "Mathieu Rivière"
subject_m2: "Gaëtan Drouet"
poster_title: "Spatio-temporal analysis of the suffix -(V)λ(λ)-"
image: "images/blog/je2026/gaetan-drouet/image0_GD.png"
type: "post"
---

<p class="actu-chapeau">
Compte-rendu par <strong>Mathieu Rivière (M1)</strong> du poster de <strong>Gaëtan Drouet (M2)</strong> présenté lors de la journée d&rsquo;étude du master, 19 mai 2026 (Computational Cultural Science Workshop).</p>

La session de poster CultureLab du 19 mai 2026 nous a permis d'assister à une présentation par Gaëtan Drouet de son travail. Il étudie les mentions d'anthroponymes à suffixe -(V)λ(λ)- dans le monde grec antique en interrogeant les facteurs spatio-temporels de ses usages.

Intitulé « Spatio-temporal analysis of the suffix -(V)λ(λ)- », ce poster, qui s'inscrit dans le cadre d'un mémoire de master 2, vise à spatialiser les usages d'un suffixe au sein de noms de personnes sous ses diverses formes en agrégeant deux bases de données existantes mais dont les buts divergent : l'une regroupant les constructions morphologiques/lexicales des différents anthroponymes, l'autre ayant une approche plus historique en listant exhaustivement toutes les occurrences idionymiques attestées du monde grec.

Son travail commence par deux constats : d'abord les origines du suffixe -(V)λ(λ)- ne sont pas élucidées puisque deux théories s'opposent, l'une valorisant l'héritage indo-européen, l'autre insistant sur la troncation de deux racines grecques. Le second constat est qu'il existe une grande variété de formes que peut prendre le suffixe -(V)λ(λ)- : tant avec le doublement du lambda qu'avec la forme prise par la voyelle (directement celle de la racine ou les voyelles ι et υ.)

La question de recherche est double : peut-on expliquer les différentes formes prises par le suffixe -(V)λ(λ)- dans les anthroponymes en spatialisant et historicisant leurs mentions – puis en y appliquant une catégorie sociologique : ce suffixe est-il genré ? En outre, un tel travail de regroupement des informations (spatio-temporelles et linguistiques) aide à vérifier (ou infirmer) l'une des deux théories sur l'origine du suffixe. Le tout dans une perspective plus large, à la fois onomastique et computationnelle.

![Distribution géographique et temporelle des occurrences](/images/blog/je2026/gaetan-drouet/image0_GD.png)

Comme mentionné ci-dessus, l'un des intérêts majeurs d'un tel travail réside dans la capacité à exploiter deux bases de données divergentes. Le Lexicon of Greek Personal Names (LGPN) recense les occurrences idionymiques avec leur localisation, leur datation et le genre du porteur — soit environ 390 000 attestations ; il répond à la question « où et quand ? ». LGPN-Ling, de son côté, décrit la structure interne des anthroponymes — racines lexicales, suffixes, structure grammaticale, soit environ 25 000 entrées — et répond à la question « comment le nom est-il construit ? ». Ces deux bases, initialement liées, ont été dotées en 2010 de modèles de données indépendants répondant à des logiques de requête différentes.

![Structure des deux bases de données mobilisées](/images/blog/je2026/gaetan-drouet/image1_GD.png)

Gaëtan Drouet rappelle toutefois les disparités importantes au sein de ce corpus. Les régions ne sont pas également représentées, ce qui tient à l'inégale richesse des vestiges archéologiques et à l'histoire des fouilles : l'Attique, Athènes en tête, concentre à elle seule une large part des occurrences, tandis que d'autres régions, comme l'Étolie, ne livrent un nombre significatif d'attestations que sur une seule période — alors même que leur population était grecque tout au long de l'Antiquité. Cela imposerait de raisonner en fréquences relatives et/ou de s'intéresser à des phénomènes intra-régionaux : la fréquence relative de telle voyelle parmi les différentes voyelles, etc.

Pour réarticuler les deux bases de données, Gaëtan Drouet a développé une chaîne de traitement où le nom (qu'il soit occurrence idionymique ou forme anthroponymique) fonctionne comme pivot : d'abord en normalisant les dates des occurrences, puis en géolocalisant les indications de lieu des occurrences via l'utilisation du gazetier Pleiades (consacré aux lieux du monde antique) qui lui a permis d'obtenir des coordonnées spatiales. Dans le même temps, chaque occurrence a été alignée sur une entrée spécifique du LGPN-Ling, laquelle contient la forme normalisée, abrégée si elle existe, l'étiquette morpho-syntaxique (catégorie grammaticale, etc.) et le ou les différent(s) suffixe(s) existants. Dès lors, la voyelle et le nombre de lambdas pouvaient être générés à partir de l'anthroponyme et de son/ses suffixe(s), de même que la forme anthroponymique utilisée au sein des différentes occurrences.

Ceci fait, il a pu créer diverses cartes en faisant varier ses catégories d'analyse (espace, temps, genre, formes du suffixe, etc.) La bibliothèque Python utilisée pour ces générations est folium.

Enfin, il a pu discuter succinctement certaines visualisations qui mettent en évidence deux corrélations.

![Cartes de distribution — première visualisation](/images/blog/je2026/gaetan-drouet/image2_GD.png)

![Cartes de distribution — seconde visualisation](/images/blog/je2026/gaetan-drouet/image3_GD.png)

L'alternance -(V)λ- / -(V)λλ- apparaît liée au genre, mais aussi à la nature grammaticale de la racine : les formes à un seul lambda se rencontrent plus fréquemment avec des racines adjectivales. Gaëtan Drouet avance une interprétation : le suffixe indo-européen \*-lo- servait surtout à former des adjectifs et se prêtait peu au dédoublement du lambda ; cette différence pourrait donc refléter la distinction morphologique sous-jacente entre les deux origines possibles du suffixe. Il s'agit là moins d'un acquis que d'une piste que la suite du travail devra étayer.

Les perspectives de ce travail sont à la fois linguistiques et méthodologiques. Au-delà du seul suffixe -(V)λ(λ)-, le projet entend démontrer la valeur d'une approche computationnelle appliquée aux corpus onomastiques anciens, en proposant un modèle d'analyse conjointe de LGPN et de LGPN-Ling. À plus long terme, la méthode pourrait être étendue à d'autres formes anthroponymiques, afin de mieux saisir les dynamiques d'innovation et de diffusion dans la morphologie des noms propres grecs.
