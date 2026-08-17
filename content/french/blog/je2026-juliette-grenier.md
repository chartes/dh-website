---
title: "Sailing in the Wind: Preliminary Analyses of Slave Ship Routes in the Early 18th Century"
title_lang: "en"  # RGAA 8.7 — le titre est en anglais, le corps du billet est en français
date: 2026-05-19
draft: false
description: "Compte-rendu du poster M2 de Juliette Grenier par Mathieu Rivière (M1) — l'influence du vent sur les routes maritimes négrières du XVIIIe siècle, à partir de journaux de bord."
category: "compte-rendu"
event_tag: "Journée d'étude HN 2026"
author_m1: "Mathieu Rivière"
subject_m2: "Juliette Grenier"
poster_title: "Sailing in the Wind: Preliminary Analyses of Slave Ship Routes in the Early 18th Century"
image: "images/blog/je2026/juliette-grenier/image1_JG.png"
type: "post"
---

<p class="actu-chapeau">
Compte-rendu par <strong>Mathieu Rivière (M1)</strong> du poster de <strong>Juliette Grenier (M2)</strong> présenté lors de la journée d&rsquo;étude du master, 19 mai 2026 (Computational Cultural Science Workshop).</p>

La session de poster CultureLab du 19 mai 2026 nous a permis d'assister à une présentation du travail de Juliette Grenier. Elle investigue l'influence du vent sur les routes maritimes empruntées par des négriers français au début du XVIIIe siècle.

Intitulé « Sailing in the Wind: Preliminary Analyses of Slave Ship Routes in the Early 18th Century », ce poster s'inscrit dans le cadre d'un mémoire de master 2, qui explore les journaux de bord tenus par les équipages/capitaines de différents navires pour retracer leur parcours de l'Afrique de l'Ouest aux Antilles françaises et l'influence (ou non) des vents sur ces itinéraires.

Juliette Grenier part d'un constat : les routes maritimes des négriers varient malgré des points de départ similaires. La question de recherche est alors celle-ci : comprendre si les vents ont une influence sur le tracé des négriers lors de la traversée de l'Atlantique au XVIIIe siècle. Si la réponse était négative, peut-être d'autres facteurs permettraient-ils d'expliquer les différences de trajectoire.

Car le corpus étudié est très riche : ce sont des journaux de bord (*logbooks*) qui renseignent chaque jour plusieurs informations : la latitude, la longitude, la distance parcourue depuis la veille et une description rédigée/qualitative des faits marquants, parmi lesquels le (ou les) vent(s), la pluie, la houle, le choix de voilure, éventuellement l'état des hommes à bord. Le vent étant renseigné quasi systématiquement, Juliette Grenier a effectivement pu retracer le trajet et la carte des vents à intervalle régulier (quotidien).

Toutefois, ces journaux de bord sont des sources du XVIIIe siècle, en français moderne, de plusieurs dizaines de pages étant donné qu'une traversée de l'Atlantique durait un à deux mois et que le voyage complet depuis l'Europe vers l'Afrique, puis les colonies américaines et le retour en Europe 4 à 6 mois. Elle a d'abord sélectionné une vingtaine de navires à partir des sources en utilisant les journaux de bord aux entrées les plus fréquentes et les plus riches. Juliette Grenier a donc développé une chaîne de traitement semi-automatique depuis l'océrisation jusqu'aux cartes.

![Chaîne de traitement — de l'océrisation à la cartographie](/images/blog/je2026/juliette-grenier/image1_JG.png)

L'ensemble du corpus a été numérisé par les Archives nationales sous les cotes MAR/4JJ/15 à MAR/4JJ/144/G. Ces archives couvrent 10 années de campagnes de traite.

Juliette Grenier a d'abord réalisé une transcription et une correction automatiques de ces documents en utilisant d'abord un VLM ouvert (Qwen-3 VL) dont la sortie bruitée est corrigée par un modèle multimodal (Gemini-3 Flash Preview). Suite à quoi elle a implémenté une post-correction automatique de cette étape de handwritten text recognition puis une correction manuelle, l'importance des données spatiales dans son travail l'y incitant.

![Pipeline de transcription et de correction](/images/blog/je2026/juliette-grenier/image2_JG.png)

L'étape suivante de son travail était l'extraction d'informations, structurées pour une part, et non structurées de l'autre. L'essentiel étant les informations géographiques / de navigation, elle a choisi de se concentrer ici sur celles-ci, c'est-à-dire la latitude, longitude, direction des vents et axe des vents par rapport à celui du navire. Quant au reste du contenu des descriptions qualitatives et notes séparées du corps du texte, elle en a fait l'extraction sans toutefois les exploiter dans le cadre de ce poster/travail. Cette extraction a été réalisée par un LLM, en l'occurrence GPT-4 mini.

D'une part, à partir de la longitude et de la latitude qui ont été normalisées, Juliette Grenier a produit une carte renseignant la position du navire quotidiennement. D'autre part, en utilisant les directions des vents – décrites dans les sources avec les points cardinaux, les marins utilisant un compas de navigation – elle a projeté ces aires de vent sur un intervalle de 1 à 36. Elle a ainsi pu établir les vents les plus communs pour chacun des navires, et bientôt, pour les différentes routes maritimes. En injectant les vents au sein des cartes déjà produites, elle obtient une représentation visuelle – pour chaque navire – à la fois de sa position et de la direction des vents, jour après jour, de l'Afrique aux Antilles.

![Représentation cartographique — positions et vents](/images/blog/je2026/juliette-grenier/image3_JG.png)

Plusieurs faits significatifs ont été observés : d'abord les vents sont globalement favorables aux navires traversant l'Atlantique d'est en ouest puisqu'ils sont majoritairement d'est. Toutefois certains navires ont une part importante de vent de sud si leur zone de départ se situe dans le golfe de Guinée ou sur la côte angolaise. Ce constat est vérifié par les travaux météorologiques, qui expliquent un tel vent. Juliette Grenier note que les négriers prennent ce vent de travers, leur permettant ainsi de remonter vers l'Atlantique nord pour rejoindre les trajectoires des navires partis depuis le Sénégal. Cette convergence des tracés se fait pourtant à quelques centaines de kilomètres à l'est des Antilles, une dizaine de jours avant de les rejoindre. C'est ici qu'un choix semble être fait par les capitaines pour atteindre les îles françaises : deux voies existent, l'une par le sud des Antilles, passant par la Martinique et caractérisée par un vent de nord, l'autre par le nord des Antilles, au-dessus de l'île de Saint-Domingue, voie caractérisée par des vents d'est et de sud.

![Deux voies possibles pour rejoindre les Antilles françaises](/images/blog/je2026/juliette-grenier/image4_JG.png)

Mais il n'existe étonnamment pas de corrélation visible entre la zone de départ (Afrique de l'Ouest ou golfe de Guinée) et le choix de la voie sud ou nord des Antilles. De même pour les navires partis des côtes sénégalaises, le choix de passer par le sud ou le nord des îles du Cap-Vert ne semble pas influencer le passage par le sud ou le nord des Antilles. Et comme nous l'avons mentionné ci-dessus, le choix sud ou nord des Antilles se fait quelques jours en amont.

Juliette Grenier fait donc une hypothèse : cette absence de logique temporelle et saisonnière nous incite à faire reposer ce choix sur le capitaine, probablement en fonction des vents dominants au moment dudit choix. Nous espérons que cette piste pourra être vérifiée/infirmée dans les suites de son travail, peut-être en exploitant le reste des informations qualitatives disponibles au sein des journaux.

Juliette Grenier propose une lecture renouvelée des journaux de bord, en reproduisant numériquement chaque trajet. Son enquête suggère que, si le vent constitue bien un facteur déterminant de la navigation négrière, il n'explique pas à lui seul le tracé des routes : celui-ci relève aussi de décisions humaines anticipées. Ce travail illustre ainsi l'apport des humanités numériques à l'histoire de la traite transatlantique — s'inscrivant dans la continuité de la mise en base des voyages de négriers, en ouvrant de nouvelles perspectives (notamment spatiales) sur l'exploitation de sources manuscrites bruitées, difficiles à mobiliser à une telle échelle.
