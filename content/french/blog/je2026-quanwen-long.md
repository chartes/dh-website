---
title: "Machine Learning-Based Identification and Comparison of Different Rubbings from the Same Object, 13th–3rd Centuries BCE"
date: 2026-05-19
draft: false
description: "Compte-rendu du poster M2 de Qaunwen Long par Chiara Tedesco (M1) — vision par ordinateur appliquée aux estampages d'inscriptions sur bronze des dynasties Shang et Zhou."
category: "compte-rendu"
event_tag: "Journée d'étude HN 2026"
author_m1: "Chiara Tedesco"
subject_m2: "Qaunwen Long"
poster_title: "Machine Learning-Based Identification and Comparison of Different Rubbings from the Same Object, 13th–3rd Centuries BCE"
type: "post"
---

> Compte-rendu par **Chiara Tedesco (M1)** du poster de **Qaunwen Long (M2)** présenté lors de la journée d'étude du master, 19 mai 2026 (Computational Cultural Science Workshop).

Dans le cadre de l'édition 2026 du colloque Humanistica, qui s'est tenue à Paris, le Grand Programme de Recherche CultureLab de l'université PSL a organisé un évènement satellite, le *Computational Cultural Science Workshop*, accueilli à l'École nationale des chartes – PSL. Celui-ci s'est déroulé les 18 et 19 mai 2026 dans les locaux de l'École. Conçu comme un véritable colloque à part entière, il a réuni une *keynote lecture*, des communications longues, des *lightning talks*, ainsi que des sessions de présentation de posters.

La session posters du mardi 19 mai après-midi, qui s'est tenue dans la salle Quicherat, était dédiée aux travaux des étudiants de deuxième année du master « Humanités numériques » de l'établissement. Les étudiants y ont présenté, sous forme de poster, les résultats des recherches menées dans le cadre de leurs mémoires de master. C'est dans ce cadre que s'inscrit le poster commenté ici.

## Sujet et question de recherche

Qaunwen Long a présenté ses recherches sous forme d'un poster intitulé *Machine Learning-Based Identification and Comparison of Different Rubbings from the Same Object, 13th–3rd Centuries BCE*. Le travail porte sur les estampages d'inscriptions sur bronze des dynasties Shang et Zhou, une catégorie essentielle de documents visuels pour l'étude des systèmes d'écriture, des institutions historiques et de la culture matérielle de la Chine ancienne. L'estampage est une image de contact obtenue à l'aide de papier, d'encre et de la surface de l'objet : il convertit une surface inscrite tridimensionnelle en une image bidimensionnelle en noir et blanc, tout en conservant les graphies, le relief, l'érosion, l'usure et les traces de surface.

Le problème abordé tient au fait qu'un même objet de bronze peut donner naissance à plusieurs versions d'estampages, produites à des époques différentes, conservées aujourd'hui dans des collections distinctes, diffusées dans des publications variées et numérisées selon des procédés hétérogènes. Ces versions diffèrent par la densité d'encre, l'état du papier, les traces de nettoyage, ou la reproduction photographique. La question de recherche est donc la suivante : comment identifier automatiquement, à grande échelle, que plusieurs estampages dispersés correspondent à un même objet original, afin de relier ces versions, de comparer différents états matériels d'une même inscription et de soutenir la vérification documentaire ?

## Hypothèse

L'hypothèse de l'étude est que la mise en correspondance de ces estampages ne peut pas reposer sur la transcription des caractères ni sur des données textuelles annotées manuellement, mais peut en revanche être traitée comme un problème de recherche d'images par le contenu (*content-based image retrieval*). En d'autres termes, des estampages issus du même objet devraient présenter, au niveau de leurs unités graphiques (graphies), une similarité visuelle suffisante pour être détectée par des modèles d'encodage, indépendamment du bruit lié aux conditions d'acquisition. Qaunwen Long émet également l'hypothèse qu'une comparaison à l'échelle de la page entière est insuffisante : seule une stratégie à l'échelle de la graphie, attentive à la qualité variable des images, permettrait de retrouver de manière fiable les multiples estampages d'un même objet.

## Approche disciplinaire et méthodologie

Le travail explore ainsi les méthodes de vision par ordinateur appliquées à l'étude de l'épigraphie chinoise. Il s'appuie sur des études récentes sur les estampages d'os oraculaires, qui traitent les estampages anciens comme des objets de recherche d'images par le contenu et réduisent la dépendance à l'OCR en comparant des structures graphiques locales. Le projet transfère cette logique aux inscriptions sur bronze et compare des modèles d'encodage fondés sur des réseaux de neurones convolutifs (CNN) et sur des architectures Transformer pour la recherche de similarité visuelle.

Le corpus de référence rassemble 14 673 images d'estampages issues du *Jinwen Jicheng* électronique, tandis que le corpus cible réunit 83 images de la bibliothèque numérique *Salamandre* du Collège de France. Au niveau des unités graphiques, le pipeline distingue 715 graphies de basse qualité et plus de 105 000 de haute qualité : chaque graphie de basse qualité sert de requête contre le corpus de haute qualité et, avec une recherche Top-50, chaque modèle produit 35 750 correspondances brutes avant agrégation au niveau de la page.

Le cœur méthodologique est un pipeline automatisé « bicanal et sensible à la qualité ». Les estampages d'entrée sont d'abord classés comme étant de haute ou de basse qualité, puis traités par des détecteurs de graphies spécifiques à chaque canal. Qaunwen Long précise que ces étiquettes de qualité décrivent seulement la détectabilité des régions graphiques pour la vision par ordinateur, et non la valeur historique, épigraphique ou documentaire de l'estampage. Les graphies détectées sont ensuite découpées des images originales et encodées par un même modèle, de sorte que tous les candidats soient comparés dans un espace de caractéristiques commun. Après normalisation L2 et recherche par similarité cosinus, les 50 meilleurs candidats au niveau de la graphie sont agrégés en classements au niveau de la page, destinés à une vérification experte.

## Résultats et perspectives

Après l'introduction de la détection sensible à la qualité et de l'appariement à l'échelle de la graphie, les performances de recherche pour les multiples estampages d'un même objet se sont nettement améliorées, à modèles d'encodage constants (EfficientNet, ViT, DINOv2-Base). Comparé au réglage fondé sur la page, le pipeline proposé fait remonter davantage de pages candidates pertinentes en tête de classement. L'évaluation reposant sur 83 échantillons de requête, l'auteur souligne avec prudence que ces résultats doivent être interprétés comme une preuve préliminaire d'une meilleure génération de candidats, et non comme une démonstration statistiquement concluante.

Le poster identifie, ensuite, les limites de ce travail. Le pipeline ne fournit pas d'identification automatique définitive des estampages d'un même objet, mais il est conçu pour la génération de candidats qui feront l'objet d'une vérification experte. Parce que les modèles d'encodage choisis ont été entraînés sur des images généralistes, ils captent mal les caractéristiques propres au domaine : structure graphique, bruit d'estampage, zones endommagées, traces matérielles. Un *fine-tuning* sur des jeux de données d'inscriptions et d'estampages sur bronze améliorerait vraisemblablement la stabilité et la pertinence des représentations extraites. La stratégie d'agrégation reste par ailleurs limitée : elle compte et classe les correspondances locales sans modéliser pleinement les relations spatiales entre graphies, et les graphies fréquentes ou visuellement simples peuvent introduire du bruit en produisant de nombreuses correspondances plausibles mais peu discriminantes.

## Conclusion

Le poster de Qaunwen Long propose un flux de travail « sensible à la qualité » et à l'échelle de la graphie pour l'appariement automatique des estampages d'inscriptions sur bronze. Plutôt que de comparer directement des images entières, le système sépare les échantillons de basse et de haute qualité, détecte les graphies individuelles à l'aide de détecteurs spécifiques, extrait des représentations à partir de régions standardisées et génère des candidats au niveau de la page par agrégation des similarités. La contribution scientifique réside dans un cadre de génération de candidats qui réduit l'espace de recherche, soutient la comparaison de versions dispersées et assiste la vérification documentaire.

Ce travail illustre l'apport des méthodes computationnelles, et notamment la vision par ordinateur, aux disciplines patrimoniales : il répond à un problème matériel concret, la fragilité et la dispersion des estampages, par une approche rigoureuse et adaptée tant à la nature des données quant aux besoins de la discipline. En maintenant l'expert humain au centre de la vérification, il articule de façon équilibrée automatisation et expertise disciplinaire, et ouvre des perspectives au-delà des frontières institutionnelles.
