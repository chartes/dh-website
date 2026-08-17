---
title: "L'auteur de stand-up : dramaturge, acteur et personnage. Analyse des styles d'écriture et de jeu d'humoristes américains"
date: 2024-05-15
draft: false
description: "Compte-rendu de la présentation M2 de Yaelle Zribi par Albina Toumarkine (M1) — approche computationnelle du stand-up américain croisant topic modelling, détection de rires et analyse du corps sur scène."
category: "compte-rendu"
event_tag: "Séminaire du master 2023-2024"
author_m1: "Albina Toumarkine"
subject_m2: "Yaelle Zribi"
poster_title: "L'auteur de stand-up : dramaturge, acteur et personnage. Analyse des styles d'écriture et de jeu d'humoristes américains"
image: "images/blog/je2024/yaelle-zribi/fig1.png"
type: "post"
---

<p class="actu-chapeau">
Compte-rendu par <strong>Albina Toumarkine (M1)</strong> de la présentation de <strong>Yaelle Zribi (M2)</strong> lors du séminaire du master, 15 mai 2024.</p>

La séance du 15 mai 2024 du séminaire du master a donné l'occasion d'assister à une présentation délivrée par Yaelle Zribi, étudiante en deuxième année du master Humanités numériques à l'École des Chartes. Après avoir suivi une classe préparatoire économique et commerciale, Yaelle Zribi obtient, en 2022, une licence bi-disciplinaire Lettres-Histoire à l'Université Paris Cité.

Le stand-up désigne un sous-genre de la comédie, caractérisé par la présence d'un.e artiste qui s'adresse directement au public avec un discours humoristique et d'apparence personnelle. Ainsi, le stand-up rompt le quatrième mur théâtral en engageant directement le public avec une apparente spontanéité. Dénué d'accessoires et de décors conventionnels, il se distingue par des improvisations et des adaptations constantes du texte tout au long du spectacle. Il repose principalement sur un mode d'expression humoristique et satirique, qui utilise souvent des gestuelles et des mimes spécifiques pour renforcer le discours. Ancré dans la culture sociale et contemporaine, le stand-up est un phénomène artistique et culturel visant à susciter le rire tout en explorant et en critiquant des aspects variés de la société.

Les recherches sur le stand-up se sont principalement concentrées sur son évolution historique, ses aspects linguistiques et littéraires, ainsi que sur ses dimensions sociologiques. Les études historiques du stand-up ont mis en lumière les diverses origines de ce sous-genre de la comédie et analysé ses évolutions formelles et scénographiques.

Les recherches littéraires et linguistiques se sont penchées sur la définition même du stand-up en tant que genre à part entière et sur la détermination de ses caractéristiques essentielles. Elles ont également interrogé la question du style de l'humoriste, en explorant les éléments littéraires et linguistiques qui le composent.

En outre, la recherche s'est intéressée à l'importance de la textualité dans ce type de performance, de fait marquée par l'oralité et la spontanéité. La rhétorique du discours comique, et notamment la prosodie, a également été étudiée.

Sur le plan sociologique, le stand-up joue un rôle essentiel dans la représentation et l'auto-représentation des minorités. Cet aspect soulève également la question du potentiel réformateur de l'humour.

Yaelle Zribi s'intéresse en particulier à la polyvalence du stand-upper, qui est à la fois dramaturge, acteur, personnage et narrateur. Ce rôle à multiples facettes s'inscrit dans une tension permanente entre la recherche d'un style personnel d'une part, et le respect des normes d'un genre codifié.

Sur scène, cette polyvalence se traduit par l'omniprésence du stand-upper, soulignant ainsi l'importance du jeu corporel de l'artiste, un deuxième aspect central de l'étude de Yaelle Zribi. Enfin, il importe également de comprendre comment cette performance centrée sur le stand-upper s'articule simultanément avec un discours autobiographique.

L'étude de Yaelle Zribi vise à explorer ces axes de recherche à travers une démarche articulant les méthodes propres aux études théâtrales avec des méthodes computationnelles. L'objectif final de ce travail est de contribuer à mieux définir cette forme artistique ainsi que les pratiques sociales qui l'accompagnent, une question qui reste non résolue. En outre, ce travail cherche à proposer de nouvelles méthodes pour l'analyse des caractéristiques esthétiques des documents audiovisuels.

Les travaux de Yaelle Zribi reposent sur un corpus de 91 captations de *Stand-Up Comedy Specials*, réalisés entre 2015 et 2024 par des artistes américain.e.s et diffusés par la plateforme Netflix. Le choix de cette source permet d'avoir un corpus exploitable d'un point de vue technique (qualité audiovisuelle, bruits de fonds réduits et montage élaboré), homogène et représentatif de la demande du grand public.

Le corpus est constitué de deux types de documents : des vidéos sous format MP4 et MKV correspondant aux captations et les transcriptions qui leur sont associées, sous format SRT.

![Figure 1 : contenu d'un fichier SRT](/images/blog/je2024/yaelle-zribi/fig1.png)

Un premier volet de cette étude, dédié au placement des rires, cherche à comprendre dans quelle mesure la dynamique des thèmes et le placement des rires répondent à des motifs du genre du stand-up.

Yaelle Zribi repère les transitions thématiques avec du *Topic Modelling*, appliqué sur les fichiers SRT. En parallèle de cette démarche, une analyse des documents audiovisuels, avec la librairie *Py audio analysis* sur Python, permet de repérer les moments de rires et d'étudier ainsi le placement des rires par rapport aux transitions thématiques.

Les résultats de ces analyses sont susceptibles de nous éclairer sur les thèmes dominants à l'échelle du corpus, ainsi que sur la succession des thèmes lors d'un spectacle. À l'échelle du corpus, il s'agira de repérer des tendances générales dans les successions thématiques.

L'objectif du deuxième volet est de repérer les moments autobiographiques dans un spectacle de stand-up par des moyens computationnels. Cela repose sur une détection de la première personne dans le corpus textuel, ainsi qu'une détection d'entités nommées avec une liste de mots clés.

Les résultats de cette analyse permettront de déterminer s'il est pertinent de classer les humoristes en fonction de la dominante thématique entre le pôle intime et le pôle politique.

Enfin, le dernier volet de ce travail explore l'articulation entre la parole et le corps. Pour cela, Yaelle Zribi a mis en place deux chaînes de traitement de *Sentiment Analysis*, afin de repérer la concordance, ou la discordance, entre les sentiments exprimés par le langage oral et corporel.

La première chaîne de traitement analyse les fichiers SRT, à l'aide de la librairie *NRClex* sur Python. Celle-ci effectue une classification du texte selon les dix émotions suivantes : la colère, la peur, l'anticipation, la tristesse, le dégoût, l'anticipation, la surprise, la joie et la confiance, les émotions positives et les émotions négatives. Elle offre également la possibilité de visualiser l'évolution de ces émotions au fil du texte, permettant ainsi de suivre l'évolution des émotions à travers différents moments et transitions thématiques du spectacle. Les premiers résultats sont prometteurs : les courbes obtenues à partir du *Sentiment Analysis* textuel semblent suivre les différents moments du spectacle et les alternances dans le discours, entre les mises en place (*set-up*) et les *punchlines* (la chute, la phrase choc).

![Figure 2 : Sentiment Analysis textuel](/images/blog/je2024/yaelle-zribi/fig2.png)

La deuxième chaîne de traitement utilise *OpenFace*, une bibliothèque open-source d'analyse d'expressions faciales développée par la Carnegie Mellon University et le Brandon Amos' research group, qui utilise des techniques de vision par ordinateur et d'apprentissage automatique pour détecter et analyser les visages dans les documents visuels.

Yaelle Zribi a constitué un sous-corpus de captures d'images extraites à intervalles définis à partir d'enregistrements vidéo. *OpenFace* analyse ces images en décomposant l'expression faciale en *action units*, c'est-à-dire des mouvements musculaires spécifiques du visage. Les émotions principales sont déterminées en fonction de la configuration de ces *action units*.

![Figure 3 : Sentiment Analysis visuel](/images/blog/je2024/yaelle-zribi/fig3.png)

Pour étudier le jeu corporel des acteurs, Yaelle Zribi utilise également la détection de poses grâce au modèle de détection d'objets en temps réel *YOLOv8*. L'objectif de cette étape est de créer un dictionnaire de poses par une classification non-supervisée. Cependant, deux obstacles majeurs se présentent : les biais imposés par le montage et le manque de référentiel pour la détection de poses. Si le premier reste plus difficile à contourner, un travail statistique élaboré peut compenser l'absence de classifieur de poses.
