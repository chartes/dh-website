---
title: "Le sacrifice des animaux à Yinxu, IIe millénaire av. J.-C."
date: 2024-06-01
draft: false
description: "Compte-rendu de la présentation M2 de Fengyi Chen par Arsène Géry (M1) — croisement d'inscriptions oraculaires et de vestiges archéologiques via topic modelling et SIG pour reconstituer les pratiques sacrificielles de la dynastie Shang."
category: "compte-rendu"
event_tag: "Séminaire du master 2023-2024"
author_m1: "Arsène Géry"
subject_m2: "Fengyi Chen"
poster_title: "Le sacrifice des animaux à Yinxu, IIe millénaire av. J.-C."
image: "images/blog/je2024/fengyi-chen/fig1.png"
type: "post"
---

<p class="actu-chapeau">
Compte-rendu par <strong>Arsène Géry (M1)</strong> de la présentation de <strong>Fengyi Chen (M2)</strong> lors du séminaire du master 2023-2024. Mémoire sous la direction de Marc Bui et Olivier Venture.</p>

Ce projet de recherche, mené par Fengyi Chen sous la direction de Marc Bui et Olivier Venture, explore les pratiques de sacrifice animal à Yinxu, un site significatif de la fin de la dynastie Shang (1300-1050 avant J.-C.). Chen vise à élucider les rôles religieux et funéraires des offrandes animales en examinant les inscriptions écrites et les vestiges archéologiques.

![Figure 1 : emplacements géographiques des sites archéologiques Shang](/images/blog/je2024/fengyi-chen/fig1.png)

<details class="figure-desc">
<summary>Description détaillée de la figure 1</summary>

Carte de la Chine du Nord et de l'Est intitulée « Sites archéologiques de l'époque
Shang (c. 1500-1040 av. J.-C.) », sur fond de relief, avec un globe en encart
situant la zone.

Une quinzaine de sites sont pointés, répartis entre le bassin du fleuve Jaune au nord
et celui du Yangzi au sud. Anyang, où se trouve Yinxu, figure au nord-est de la zone
couverte.

</details>

Le site d'Anyang, où se trouve Yinxu, a été découvert grâce à des fouilles archéologiques au XXe siècle. Il représente la dernière capitale de la dynastie Shang, couvrant une superficie de 30 kilomètres carrés. Cette ville antique dispose d'une grande diversité de traces archéologiques permettant d'analyser et d'interpréter la vie urbaine, sociale et religieuse de la dynastie Shang, réputée pour son artisanat en bronze et sa structure sociale hiérarchique, comme en témoignent ses pratiques funéraires élaborées.

Le royaume Shang était une entité en réseau formée par l'unification de diverses tribus en cités-états, gouvernées sous une autorité centralisée. Cette urbanisation est évidente à travers la présence de bâtiments administratifs, de lieux de culte, de rues et de quartiers distincts à Yinxu.

Les sources principales utilisées dans le projet de recherche de Chen comprennent des inscriptions écrites, en particulier des inscriptions oraculaires (sur carapaces de tortues), et des traces archéologiques d'offrandes, en particulier des ossements d'animaux de diverses espèces. Les questions centrales de l'étude portent sur (1) l'examen de l'évolution de la typologie d'animaux utilisés en tant qu'offrandes dans les rituels religieux et funéraires, (2) la comparaison des offrandes royales décrites dans les inscriptions avec les traces archéologiques provenant de la population générale, et (3) l'exploration des échanges d'objets et de la circulation des idées au sein de cette société antique.

![Figure 2 : inscriptions oraculaires sur carapaces de tortues](/images/blog/je2024/fengyi-chen/fig2.png)

![Figure 3 : ossements de chien dans les offrandes à Anyang](/images/blog/je2024/fengyi-chen/fig3.png)

La méthodologie employée pour l'analyse des inscriptions implique la récupération de données à partir de bases de données en ligne gérées par l'Académie chinoise des sciences sociales (CASS) et Academia Sinica. Chen a déployé des techniques de *web scraping* pour collecter ces données brutes, qui ont ensuite été nettoyées pour supprimer les conjonctions grammaticales et les mots non pertinents. Ce processus aboutit à un ensemble de données comprenant 3 207 inscriptions, chacune annotée avec 13 attributs englobant à la fois des variables quantitatives (telles que la quantité des offrandes) et des variables qualitatives (telles que la couleur et la taille).

![Figure 4 : chaîne de traitement des données employée par Chen](/images/blog/je2024/fengyi-chen/fig4.png)

<details class="figure-desc">
<summary>Description détaillée de la figure 4</summary>

Schéma de la chaîne de traitement : collecte par web scraping depuis une base de
données, structuration des données, puis deux traitements parallèles sous Python —
une modélisation thématique par LDA avec Gensim et une visualisation avec Pandas et
Matplotlib — dont les résultats convergent vers l'interprétation.

</details>

La modélisation thématique (*topic modelling*) a été employée pour découvrir les thèmes sous-jacents au sein des inscriptions. L'algorithme Latent Dirichlet Allocation (LDA), implémenté à l'aide de la bibliothèque Gensim, joue un rôle central dans cette analyse. La chaîne de traitement des données a débuté par le prétraitement des données textuelles pour éliminer les mots vides et standardiser les termes. Un modèle initial avec cinq thèmes a été formé, suivi d'un modèle plus raffiné avec dix thèmes pour capturer des thèmes plus granulaires et détaillés. Les résultats ont été visualisés à l'aide de PyLDAvis, un outil interactif facilitant l'exploration des relations entre les termes et les thèmes.

La modélisation thématique a révélé quatre thèmes prédominants. Premièrement, l'utilisation des bovins est apparue comme un thème significatif, les bovins (y compris les bœufs, les vaches et les taureaux) étant fréquemment mentionnés seuls ou en combinaison avec d'autres espèces. Deuxièmement, les termes relatifs aux activités de divination. Troisièmement, des rituels spécifiques, tels que la crémation, ont été identifiés, indiquant les pratiques cérémoniales associées aux sacrifices bovins. Quatrièmement, d'autres animaux domestiques, y compris les moutons, les chiens et les porcs, ont été regroupés, reflétant leur utilisation dans divers contextes sacrificiels depuis la période néolithique.

![Figure 5 : résultats de la modélisation thématique](/images/blog/je2024/fengyi-chen/fig5.png)

<details class="figure-desc">
<summary>Description détaillée de la figure 5</summary>

Quatre diagrammes en barres empilées, un par catégorie de destinataire de l'offrande :
« Divinité », « Ancêtre », « Prière » et « Protection ». Chacun porte les espèces
animales en abscisse (bovins, chiens, ovins, suidés, chevaux, tortues…) et le nombre
de mentions en ordonnée, les couleurs distinguant les destinataires précis.

</details>

De plus, le projet de recherche de Chen implique la saisie de données issues des rapports de fouilles dans une base de données relationnelle. Cette base de données comprenait 1 751 structures archéologiques, chacune décrite avec 10 attributs. La distribution spatiale de ces structures a été visualisée à l'aide de Systèmes d'Information Géographique (SIG), en particulier QGis, une application open-source pour la visualisation, l'édition et l'analyse de données géospatiales.

L'analyse SIG a été soutenue par OpenStreetMap (OSM), qui fournissait la carte de base pour la ville contemporaine d'Anyang. Cette carte de base a servi à géoréférencer les sites anciens en superposition avec la ville moderne. Le géoréférencement impliquait l'alignement des cartes historiques et des plans archéologiques avec les coordonnées géographiques modernes, un processus crucial pour placer avec précision les structures anciennes dans le contexte géographique actuel. Les plans historiques dessinés par les archéologues ont été scannés et superposés sur la base OpenStreetMap, assurant un alignement précis grâce à des points de contrôle correspondant à des caractéristiques identifiables sur les deux cartes.

À partir des images géoréférencées, des cartes vectorielles ont été créées. Ces cartes se composent de points, de lignes et de polygones représentant diverses caractéristiques archéologiques. Ce processus a permis de créer une carte complète et détaillée de la ville antique, permettant de schématiser la distribution des pratiques sacrificielles. Chen démontre notamment la dispersion et la concentration des sacrifices de chiens. Les inscriptions décrivaient les chiens comme des offrandes aux divinités, en particulier dans les prières pour éviter les catastrophes naturelles, contrairement aux sacrifices bovins principalement utilisés pour les rites ancestraux.

La distribution spatiale des restes de chiens a révélé des concentrations significatives dans certaines zones de Yinxu. Par exemple, à Xibeigang, le cimetière royal, une forte concentration de restes de chiens indique leur utilisation dans des pratiques religieuses aristocratiques. De plus, Miaopu, qui comprenait des tombes aristocratiques et un atelier de cuivre, présente également des concentrations significatives de restes de chiens, suggérant l'utilisation des espèces animales à travers différentes strates sociales de la dynastie Shang et zones fonctionnelles d'Anyang.

![Figure 6 : carte de dispersion des ossements de chiens](/images/blog/je2024/fengyi-chen/fig6.png)

<details class="figure-desc">
<summary>Description détaillée de la figure 6</summary>

Carte de densité du site d'Anyang, avec l'échelle et l'orientation, superposée au
parcellaire et aux toponymes actuels. Des points rouges marquent les structures où des
ossements de chiens ont été trouvés, accompagnés du nombre de restes ; des halos plus
ou moins soutenus signalent les zones de concentration. La plus dense se situe au nord
de la carte, une autre plus à l'est.

</details>

L'analyse statistique a été réalisée à l'aide de Pandas, une bibliothèque Python pour la manipulation et l'analyse des données. Cette analyse examine la distribution et la fréquence des sacrifices animaux, identifiant des schémas statistiquement significatifs corrélant avec des emplacements géographiques. L'intégration des inscriptions avec les données archéologiques à travers le SIG a mis en évidence des discordances et des corrélations entre les archives écrites et les preuves matérielles.

Les cartes géoréférencées et vectorielles permettent donc une exploration visuelle des données, révélant les relations spatiales et les schémas de distribution par espèces et par thématique d'offrandes. Ces cartes sont annotées dans le projet final avec des repères archéologiques et modernes, facilitant la compréhension des dynamiques spatiales de l'ancienne Yinxu.
