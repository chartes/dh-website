---
title: "Joke Maths : Modelling and Analyzing 91 Netflix Stand-up Comedy Specials"
date: 2025-06-27
draft: false
description: "Compte-rendu du lightning-talk M2 de Yaelle Zribi par Maria Kirbasova (M1) — modélisation computationnelle du stand-up à partir de 91 spéciaux Netflix, entre topic modelling, détection des rires et analyse du corps sur scène."
category: "compte-rendu"
event_tag: "Journée d'étude HN 2025"
author_m1: "Maria Kirbasova"
subject_m2: "Yaelle Zribi"
poster_title: "Joke Maths : Modelling and Analyzing 91 Netflix Stand-up Comedy Specials"
type: "post"
---

> Compte-rendu par **Maria Kirbasova (M1)** du lightning-talk de **Yaelle Zribi (M2)** présenté lors de la journée d'étude du master, 27 juin 2025 (séminaire de recherche 2024-2025, associé au colloque *Bridging Computational Humanities and Computational Social Sciences* organisé par AISSAI — Marie Puren et Florian Cafiero — et l'ENC — Chahan Vidal-Gorène).

Le stand-up est un genre de spectacle comique qui peut sembler simple à première vue : une personne seule sur scène, sans costume ni décors, partage ses pensées et ses anecdotes. Cependant, derrière cette apparente spontanéité se cache une forme de performance complexe. Les principales caractéristiques de ce format sont le « one man/woman show », le minimalisme dans la mise en scène et l'absence de frontière claire entre l'artiste et le public. Le comédien de stand-up interagit activement avec le spectateur, brisant ainsi le « quatrième mur » (*crowd work*). Le plus souvent, le style de présentation imite le « flux de conscience », créant l'illusion de l'improvisation. Le discours du stand-up aborde souvent des thèmes obscènes ou politiquement chargés, oscillant entre les expériences personnelles du comédien et les problèmes sociaux.

Cependant, le genre ne se limite pas au contenu, il comprend également le talent d'interprétation (le sens du rythme, le travail des pauses, la capacité à faire rire au bon moment) et des éléments de théâtre physique (gestes, mimiques, voix) qui jouent un rôle important. Tout cela fait du stand-up une forme d'art techniquement complexe et multiforme, dont la définition s'avère beaucoup moins évidente qu'il n'y paraît à première vue.

L'état actuel des recherches scientifiques sur le stand-up montre que les études dans ce domaine sont dispersées dans différentes disciplines : littérature, communication, psychologie, droit, etc. Il s'agit le plus souvent d'études de cas individuels plutôt que d'une étude systématique du genre.

Il existe de nombreuses approches sociologiques qui interprètent le stand-up comme une forme de « *standing up* » qui se traduisent par une révolte métaphorique, une prise de parole, un acte de citoyenneté. Cependant, l'aspect littéral du « *standing up* » est souvent négligé.

Ainsi, Yaelle Zribi formule les questions de recherche suivantes : Qu'est-ce qui fait qu'un stand-up est « bon » ? Quels critères peuvent être utilisés pour évaluer les performances ? Comment constituer un corpus d'analyse en l'absence de canon reconnu ? Ce travail vise également à proposer des méthodes innovantes pour analyser les caractéristiques esthétiques du contenu audiovisuel.

En partant de l'hypothèse que, d'une part, les Netflix Comedy Specials peuvent servir de canon conditionnel du stand-up, reflétant à la fois les tendances existantes et en créant de nouvelles, et que, d'autre part, des éléments tels que le corps, le discours et le rythme peuvent être mobilisés pour une analyse empirique, Yaelle Zribi construit sa recherche sur la base d'un corpus de 91 stand-up spéciaux issus de la plateforme Netflix.

Les méthodes utilisées par Yaelle Zribi combinent les méthodes propres aux études théâtrales avec des méthodes computationnelles. Ainsi, elle utilise tout d'abord le *Topic Modelling* pour analyser les transitions thématiques dans les stand-ups. Cette méthode a révélé une grande variété de thèmes apparaissant dans les stand-up comiques, mais a également montré certaines limites. Tout d'abord, dans le cadre d'un stand-up, les thèmes peuvent changer très rapidement, avec seulement 10 à 20 secondes consacrées à chaque thème. De plus, le changement de thème peut parfois être difficile à percevoir, même pour un être humain, ce qui complique également la détection automatique.

Yaelle Zribi a également identifié les moments de rire en déterminant le nombre de segments contenant des rires pour chaque élément étudié du corpus (spectacles de stand-up).

En interprétant les données présentées, Yaelle Zribi se pose la question suivante : les meilleurs humoristes font-ils rire davantage ? Ses résultats démontrent que ce n'est pas toujours le cas. En comparant les deux extrêmes, la chercheuse conclut que le nombre de rires reflète davantage le style personnel et la manière de se produire du comédien qu'il ne constitue un indicateur universel du « succès » d'une performance. Ainsi, un niveau élevé de rire peut être associé, par exemple, à une présentation plus expressive et « énergique », tandis que des réactions moins fréquentes du public peuvent être liées à une forme de stand-up plus introspective ou mélancolique.

Une autre méthode utilisée par Yaelle Zribi repose sur l'étude du corps des humoristes de stand-up. Cette méthode vise à étudier de près non seulement les gestes et les mouvements, mais également le positionnement des artistes sur scène. Pour ce faire, elle a d'abord procédé à la détection des personnes sur l'ensemble du corpus. Les données obtenues représentent 500 000 images. Ensuite, elle a extrait un sous-ensemble de 80 000 images afin de tester plus précisément les postures frontales des artistes. Sur ces images, elle a appliqué une détection de silhouettes et a observé les différentes manières dont les humoristes occupent l'espace scénique. Cela lui a permis de construire une sorte de dictionnaire des postures corporelles, dans le but de catégoriser les types de présence scénique (statique, mobile, ouverte, fermée, etc.) et d'analyser leur rôle dans la construction du style comique.

Pour conclure, l'étude menée par Yaelle Zribi permet de faire des progrès importants vers une formalisation de la compréhension de la comédie stand-up, même si la « formule magique » d'un spectacle réussi n'a pas encore été trouvée. La comédie stand-up s'est révélée être un sujet pertinent d'analyse à l'aide des méthodes de « visionnage distant » (*distant viewing*), ainsi qu'un phénomène culturel significatif, suscitant l'intérêt tant d'un point de vue épistémologique qu'artistique. La prochaine étape logique de la recherche consiste à améliorer le pipeline analytique, notamment en renforçant sa stabilité et son efficacité.
