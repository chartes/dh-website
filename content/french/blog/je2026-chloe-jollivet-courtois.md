---
title: "The Persuasive Power of Media Framing on Television: Modeling the Impact of Immigration Framing on Public Opinion (2013-2017)"
date: 2026-05-19
draft: false
description: "Compte-rendu du poster M2 de Chloé Jollivet-Courtois par Manon Remot (M1) — mesure computationnelle du cadrage médiatique de l'immigration dans les JT français et impact sur l'opinion publique."
category: "compte-rendu"
event_tag: "Journée d'étude HN 2026"
author_m1: "Manon Remot"
subject_m2: "Chloé Jollivet-Courtois"
poster_title: "The Persuasive Power of Media Framing on Television: Modeling the Impact of Immigration Framing on Public Opinion (2013-2017)"
image: "images/blog/je2026/chloe-jollivet-courtois/img-000.jpg"
type: "post"
---

> Compte-rendu par **Manon Remot (M1)** du poster de **Chloé Jollivet-Courtois (M2)** présenté lors de la journée d'étude du master, 19 mai 2026 (Computational Cultural Science Workshop, dans le cadre du colloque Humanistica).

Lors de la séance du mardi 19 mai 2026 du séminaire du master humanités numériques de l'École des chartes, Chloé Jollivet-Courtois a présenté les recherches menées dans le cadre de son mémoire intitulé : *The Persuasive Power of Media Framing on Television: Modeling the Impact of Immigration Framing on Public Opinion (2013-2017)*.

Le travail de Chloé Jollivet-Courtois s'appuie sur le constat suivant : en 2015, la crise des réfugiés est massivement couverte par les médias. En conséquence, de nombreuses études se sont attelées à évaluer l'impact de la couverture médiatique sur la polarisation de l'opinion publique sur les questions d'immigration. Cependant, aucune étude ne s'était encore attardée sur la façon dont l'immigration était dépeinte dans les médias et du potentiel impact que ce cadrage pouvait avoir sur l'opinion publique.

Deux objectifs ont été fixés. Le premier était de développer une mesure computationnelle du cadrage de l'immigration fait par les émissions télévisées. Le second était de déterminer si le cadrage pro ou anti immigration pouvait directement impacter l'opinion publique sur l'immigration et les migrants.

Pour ce faire, un corpus composé de deux jeux de données différents a été constitué.

Pour former le premier jeu de données, des notices documentaires et transcriptions d'émissions d'information et journaux télévisés ont été récupérées dans les archives de l'INA grâce à une liste de mots associés à l'immigration. Au total 34 916 lignes de notices documentaires et transcriptions de journaux télévisés et émissions traitant de l'immigration entre janvier 2013 et décembre 2017 ont été collectées. Cependant, certains mots-clés de la liste comme « étranger » ont conduit à la récupération de contenu hors-sujet. Un tri a donc dû être fait avec l'aide d'une méthode de classification automatique via un LLM (gpt-oss-120b). La version finale du corpus est donc composée de 12 603 transcriptions.

Il convient de préciser que toutes ces émissions proviennent de chaînes de télévision française (TF1, Arte, France 2, France 3, CNews (anciennement I-Télé) et BFMTV). Par ailleurs n'ont été retenues uniquement que les émissions politiques, les séries télé et autre divertissement ont été exclus.

Le deuxième jeu de données contient les résultats des enquêtes ELIPSS Dynamob dans lesquelles les répondants avaient été interrogés 18 fois de 2013 à 2017 sur leurs opinions concernant l'immigration.

Il s'agissait ensuite de croiser les données des émissions de télévision avec les résultats du sondage d'opinion d'ELIPSS. C'est à cette étape qu'intervient l'élaboration de la mesure de cadrage, aussi appelée *measure of framing*. Cette dernière a été construite avec gpt-oss-120b, un LLM (*Large Language Model*), qui a permis de classer les émissions dans une des catégories suivantes : anti-immigration, neutre, pro-immigration. Dans un second temps, Chloé Jollivet-Courtois a fait appel à XLM-RoBERTa-large, un modèle de la famille BERT. Spécialisé dans la mesure de l'*arousal*, éveil émotionnel en français, dans les textes, il a permis de mesurer la charge émotionnelle des transcriptions donc de leur potentiel stimulateur.

![Évolution mensuelle du nombre d'émissions traitant de l'immigration, par chaîne](/images/blog/je2026/chloe-jollivet-courtois/img-000.jpg)

Ces deux mesures (*framing* + *arousal*) ont ensuite été intégrées à un modèle de régression linéaire pour déterminer si l'exposition à un certain type d'émissions au cadrage particulier peut faire basculer l'opinion des individus de modérée à extrême.

Au total, 2660 émissions ont été classées anti-immigration, soit 21,1 % des émissions, 4764 ont été classées neutre soit 37,8 % et 51 780 des émissions ont été classées pro-immigration soit 41,1 %. Pour ce qui est de l'*arousal*, il est équivalent pour les émissions anti et pro immigration (0,53) et de 0,50 pour les émissions neutres.

![Distribution des scores d'arousal prédits sur les transcriptions](/images/blog/je2026/chloe-jollivet-courtois/img-001.jpg)

![Scatter plot des scores de valence versus arousal pour toutes les transcriptions](/images/blog/je2026/chloe-jollivet-courtois/img-002.jpg)

Chloé Jollivet-Courtois entend poursuivre l'analyse des résultats obtenus en annotant les données et en les classant dans les catégories anti-immigration, neutre ou pro-immigration. Il reste également à implémenter le modèle économétrique permettant de capturer le passage d'une opinion modérée à une opinion plus extrême. Enfin, une comparaison de l'impact du cadrage de l'immigration et l'impact de la couverture de l'immigration (à quel point les médias parlent d'immigration), mesurée dans Schneider-Strawczynski et Jérôme Valette (2025), sera effectuée.

Dans un futur plus lointain, Chloé Jollivet-Courtois indique qu'il serait intéressant d'étendre la mesure du cadrage au traitement différencié des invités, en fonction de leur proximité politique avec la ligne éditoriale de la chaîne.
