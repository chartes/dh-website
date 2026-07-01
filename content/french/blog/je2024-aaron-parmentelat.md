---
title: "La distribution des propriétaires immobiliers à Paris (1898-1951)"
date: 2024-04-10
draft: false
description: "Compte-rendu de la présentation M2 d'Aaron Parmentelat par Donghan Bian (M1) — chaîne HTR maison (YOLO + PÉROU + spaCy) sur les annuaires des propriétaires de Paris pour cartographier la propriété immobilière et l'émergence des multipropriétaires."
category: "compte-rendu"
event_tag: "Séminaire du master 2023-2024"
author_m1: "Donghan Bian"
subject_m2: "Aaron Parmentelat"
poster_title: "La distribution des propriétaires immobiliers à Paris (1898-1951)"
image: "images/blog/je2024/aaron-parmentelat/fig1.png"
type: "post"
---

> Compte-rendu par **Donghan Bian (M1)** de la présentation d'**Aaron Parmentelat (M2)** lors du séminaire du master, 10 avril 2024.

Lors de la séance du 10 avril 2024 du séminaire du master Humanités Numériques, Aaron Parmentelat, titulaire de la licence MIASHS à l'Université Panthéon-Sorbonne et en master 2 de Humanités Numériques à l'École nationale des chartes, a présenté son projet de recherche sur la distribution des propriétaires immobiliers à Paris pour les années 1898 et 1951.

## Contexte et objectifs

La recherche explore la localisation des propriétaires, la présence de multipropriétaires et les liens entre les propriétés détenues et les lieux de résidence. L'analyse s'effectue à une granularité très fine, subdivisant chaque arrondissement parisien en quatre quartiers administratifs, totalisant 80 quartiers.

![Fig. 1 — Le nombre d'immeubles par quartier en 1898](/images/blog/je2024/aaron-parmentelat/fig1.png)

## Méthodologie

Les données proviennent des annuaires des propriétaires de Paris. Pour 1898, les données ont été nettoyées par Carmen Brando et Frédérique Mélanie-Becquet, transformant les listes de noms en listes d'adresses.

Face aux limitations de Transkribus, un nouveau processus de traitement a été développé, combinant traitement d'images, annotation manuelle et reconnaissance de texte manuscrit (HTR). Les étapes incluent :

- Transformation d'images en noir et blanc avec amélioration du contraste et de la luminosité
- Annotation manuelle de 75 pages pour *fine-tuning* du modèle YOLO
- Utilisation de YOLO pour détecter les zones de colonnes
- Application de PÉROU pour la reconnaissance de texte manuscrit
- Utilisation de spaCy pour la reconnaissance d'entités nommées (NER) et génération de fichiers CSV

![Fig. 2 — Pipeline de l'extraction des informations depuis la liste des propriétés](/images/blog/je2024/aaron-parmentelat/fig2.png)

Les modèles ont été sélectionnés pour leur performance : YOLO pour la détection des colonnes, PÉROU pour la HTR avec de meilleurs résultats que Tesseract, et spaCy pour l'extraction d'entités avec *few-shot learning*. Le seul problème restant concerne la distinction entre noms de personnes et d'organisations.

![Fig. 3 — Score du modèle fine-tuné de YOLO v8 (segmentation)](/images/blog/je2024/aaron-parmentelat/fig3.png)

## Résultats préliminaires

Les cartes exploratoires générées pour 1898 montrent la densité des immeubles et la distribution des multipropriétaires, principalement concentrés dans l'ouest et le sud de Paris, ainsi que dans leurs lieux de résidence.

![Fig. 4 — Résultats préliminaires, partie 1](/images/blog/je2024/aaron-parmentelat/fig4.png)

L'année 1951 marque un changement dans l'enregistrement, passant de l'immeuble à l'appartement, reflétant une transition vers la copropriété plus fréquente.

![Fig. 5 — Résultats préliminaires, partie 2](/images/blog/je2024/aaron-parmentelat/fig5.png)

## Questions et discussions

**Choix des années 1898 et 1951 :** 1951 était la dernière année de publication. En 1898, une seule personne possédait généralement un immeuble entier. À partir de 1951, l'enregistrement par appartement reflétait le partage de propriété, créant une surcharge d'informations rendant impossible la publication annuelle.

**Choix de YOLO :** Préféré à Transkribus pour de meilleures performances en détection de zones de texte.

**Nommage des colonnes :** Les numéros permettent une meilleure désignation positionnelle.

**Expressions régulières versus NER :** La reconnaissance d'entités nommées offre une robustesse accrue face à la variabilité des ponctuations et formats non standardisés.

**Continuité des propriétaires :** L'étude a révélé une certaine continuité dans la richesse des propriétaires sur 50 ans, malgré les changements socio-économiques.

**Haussmannisation :** Joue un rôle important, surtout dans les zones centrales et occidentales de Paris, avec moindre influence au sud.

**Propriétés publiques et privées :** Les données de 1898 concernent principalement les propriétés privées, tandis que les logements publics deviennent significatifs après la Seconde Guerre mondiale.

**Contribution de la recherche :** Étudier la distribution de la richesse par le biais de l'analyse des propriétés immobilières.
