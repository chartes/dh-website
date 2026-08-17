---
title: "Multilateralism between the two World Wars and its perception in the French Parliament"
title_lang: "en"  # RGAA 8.7 — le titre est en anglais, le corps du billet est en français
date: 2025-06-27
draft: false
description: "Compte-rendu du lightning-talk M2 de Donghan Bian par Juliette Grenier (M1) — RAG appliqué au Journal officiel de la République française pour étudier la perception du multilatéralisme au Parlement dans les années 1929-1939."
category: "compte-rendu"
event_tag: "Journée d'étude HN 2025"
author_m1: "Juliette Grenier"
subject_m2: "Donghan Bian"
poster_title: "Multilateralism between the two World Wars and its perception in the French Parliament"
image: "images/blog/je2025/donghan-bian/fig1.png"
type: "post"
---

<p class="actu-chapeau">
Compte-rendu par <strong>Juliette Grenier (M1)</strong> du lightning-talk de <strong>Donghan Bian (M2)</strong> présenté lors de la journée d&rsquo;étude du master, 27 juin 2025 (séminaire de recherche 2024-2025, associé au colloque <em>Bridging Computational Humanities and Computational Social Sciences</em> organisé par AISSAI — Marie Puren et Florian Cafiero — et l&rsquo;ENC — Chahan Vidal-Gorène).</p>

Les recherches menées par Donghan Bian portent sur le multilatéralisme dans l'entre-deux-guerres, et plus particulièrement sur sa perception par le Parlement français. Dans les années 1920, le régime politique français est qualifié par Raymond Carré de Malberg de « gouvernement parlementaire », mettant ainsi l'accent sur l'importance du Parlement, composé du Sénat et de la Chambre des députés, dont l'objectif est de lier, toujours selon Carré de Malberg, les pouvoirs exécutif et législatif. Le multilatéralisme désigne, quant à lui, un type de relations internationales entre plusieurs États, ayant pour objectif de mettre en place des règles et des accords de coopération communs. Donghan Bian s'intéresse à l'expression de ce multilatéralisme au sein du Parlement français, tout en cherchant à savoir si la génération augmentée de récupération (ou RAG) — une technique spécifique de traitement du langage naturel — peut s'appliquer aux travaux historiques. Il s'agit donc de mêler technologie de pointe et histoire internationale.

Les séances du Parlement sont, aux XIXe et XXe siècles, publiques. Ainsi, les sources utilisées par Donghan Bian sont les numéros du Journal officiel de la République française, qui publie de manière quotidienne les textes de lois et les décrets officiels, entre le 1er janvier 1929 et le 31 décembre 1939. Il mobilise aussi deux « sous-corpus » : les parutions propres à la Chambre des députés (soit 989 documents) et celles relatives au Sénat (766 documents). L'intégralité du corpus est scrappée directement depuis Gallica et nécessite donc un traitement post-OCR. C'est une étape délicate, puisqu'elle dépend de facteurs extérieurs : sur Gallica, les pages sont arrondies, il est donc difficile de détecter tous les caractères et le texte ne peut pas être bien lu. Les erreurs sont donc, en raison de la mise en page, complexes à corriger. Chaque document compte un ratio de 13,35 % d'erreurs. Ce taux tend à diminuer au fil de la position des caractères dans le texte.

![Fig. 1 — Distribution des erreurs dans les textes (D. Bian)](/images/blog/je2025/donghan-bian/fig1.png)

Une fois le corpus corrigé, il s'agit d'en extraire les données pour pouvoir les traiter. Les différents textes sont découpés pour en extraire les entités nommées afin d'établir une liste de noms propres. Un calcul de distance de Levenshtein est appliqué à ces entités. On obtient une liste de morceaux des textes avec les entités. Cette liste est annotée : si le mot est une entité, alors on lui attribue la valeur 1 sinon 0. À ce dataset final, on applique un système de régression pour faire un classifieur. Pour obtenir une meilleure contextualisation des entités, on extrait aussi des morceaux de textes ce qui vient avant et après l'entité. Les résultats du classifieur sont plutôt concluants, puisque les données de départ ne sont pas très propres, sauf pour la catégorie propre à la politique internationale. La précision est de 0,80 pour les données utiles et de 0,93 pour les données inutiles. Les résultats du classifieur sont classés selon le score obtenu. De plus, un classement est réalisé aussi pour les données annotées avec 0 et 1.

![Fig. 2 — Chaîne de traitement des données (D. Bian)](/images/blog/je2025/donghan-bian/fig2.png)

L'extraction avec la génération augmentée de récupération (ou RAG) permet de produire un graphique de connaissances fondé sur les données extraites des textes avec 40 474 nœuds, et 23 426 relations entre les entités. 91,06 % de ces nœuds sont classés dans 7 catégories (comme les personnes nommées, les organisations, les événements, la géographie, les concepts, etc.). La vision générale n'est, cependant, pas jugée convaincante pour le moment.

![Fig. 3 — Classification des nœuds (D. Bian)](/images/blog/je2025/donghan-bian/fig3.png)

![Fig. 4 — Graphe de connaissances (D. Bian)](/images/blog/je2025/donghan-bian/fig4.png)

L'ensemble de cette étude présente, toutefois, quelques limites, selon Donghan Bian. En effet, les erreurs de l'OCR ne peuvent pas être éliminées entièrement et faussent nécessairement les résultats. L'extraction avec RAG prend un temps très long. De plus, l'utilisation de petits LLMs produit des anomalies et des valeurs qui ne sont pas exploitables. Enfin, l'interprétation des résultats implique nécessairement l'intervention humaine.
