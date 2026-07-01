---
title: "Digital Traces of the Reception of Forcibly Displaced People from Ukraine in Russia: Between Staged Hospitality and Everyday Tensions"
date: 2026-05-19
draft: false
description: "Compte-rendu du poster M2 de Maria Kirbasova par Marisol de Nazelle (M1) — une approche cyberethnographique confrontant discours étatique russe (TASS) et traces numériques des déplacés d'Ukraine sur Telegram."
category: "compte-rendu"
event_tag: "Journée d'étude HN 2026"
author_m1: "Marisol de Nazelle"
subject_m2: "Maria Kirbasova"
poster_title: "Digital Traces of the Reception of Forcibly Displaced People from Ukraine in Russia: Between Staged Hospitality and Everyday Tensions"
type: "post"
---

> Compte-rendu par **Marisol de Nazelle (M1)** du poster de **Maria Kirbasova (M2)** présenté lors de la journée d'étude du master, 19 mai 2026 (Computational Cultural Science Workshop, École nationale des chartes, 18–19 mai 2026). Mémoire codirigé par Françoise Daucé (EHESS, CERCEC) et Thierry Poibeau (CNRS, LATTICE).

Si *LinkedIn* avait existé depuis 1847 et que Taras Chevtchenko[^1] avait pu passer par la session de posters CultureLab du 19 mai 2026[^2], nul doute que le poster de Maria Kirbasova aurait attiré son attention. Prolongeons l'hallucination collective. Son post aurait commencé ainsi :

> « Шановна мереже,
> вау... »,

ce qu'un expert chevronné traduirait en

> « Cher réseau,
> Wow… ».

Présenté lors de la session de posters CultureLab du *Computational Cultural Science Workshop*, le travail de Maria Kirbasova s'attaque à l'un des angles morts du conflit : l'accueil et la prise en charge des populations d'Ukraine déplacées de force vers la Russie depuis février 2022. L'étude propose ainsi une confrontation rigoureuse entre la mise en scène du discours étatique russe et les traces numériques de l'expérience vécue au quotidien par ces déplacés. Elle contourne un obstacle méthodologique majeur : l'impossibilité de mener une enquête de terrain classique en Russie depuis 2022 en raison de la censure et des restrictions d'accès. Les outils des humanités numériques y sont mobilisés pour déployer une approche cyberethnographique sur le web social.

## Cadre théorique

Le travail s'articule autour d'un double cadre théorique. D'une part sur **l'analyse du discours et du pouvoir symbolique** (Charaudeau ; Guriev & Treisman sur les autocraties informationnelles) pour étudier les mécanismes de légitimation du récit étatique.

D'autre part sur **la sociologie des migrations numériques** (Leurs & Smets ; Diminescu). Le concept de « migrant connecté » de Diminescu est ici complexifié : en territoire adverse, le smartphone fonctionne moins comme un outil de maintien du lien avec le pays d'origine que comme une infrastructure de survie et de navigation administrative.

## Matériau et méthodologie

Le poster adopte une structure binaire opposant la communication officielle (TASS) aux échanges informels des déplacés (Telegram). Malgré la forte densité des données textuelles et des schémas, la visualisation rend compte de la massivité du corpus traité sur la période du 18 février 2022 au 11 décembre 2025.

Le matériau d'étude se divise en deux volets : un **volet institutionnel** composé de 1 870 articles de l'agence de presse étatique TASS, base du discours officiel, et un **volet social** composé de 1 619 089 messages (réduits après filtrage à 693 667) issus d'un écosystème de 175 à 200 espaces Telegram, dont un échantillon ciblé de 41 chats locaux répartis dans 15 villes russes d'accueil.

Pour le corpus TASS, le traitement repose sur une extraction par scraping, une lemmatisation et un entraînement de classificateurs supervisés. Pour Telegram, la détection des narratifs s'appuie sur le modèle ChatGPT 5.4 guidé par une grille d'annotation thématique. Les performances obtenues (*Exact Match* : 0,853 ; Micro-F1 : 0,919 ; Macro-F1 : 0,869) valident la capacité du modèle à classifier de grands volumes de texte tout en maintenant la cohérence des catégories de discours.

Le *topic modelling* (LDA et BERTopic) appliqué à Telegram montre la résistance de ce type de données textuelles aux outils de TAL standard. La fragmentation et le bruit des messages (émoticons, argot) ont d'abord généré plus de 1 000 micro-thèmes. L'autrice a choisi de réduire ce modèle à 80 thèmes interprétables, écartant 50 % du corpus sous forme de bruit. Cette réduction importante illustre les limites des approches statistiques pures face au web social et souligne la nécessité d'un arbitrage humain en aval de l'algorithme.

## Résultats : mise en scène étatique vs expérience vécue

Le croisement des corpus met en évidence l'écart entre la mise en scène étatique et l'expérience vécue.

L'analyse montre quant à elle la construction d'un récit axé sur la protection des populations russophones du Donbass et la valorisation des efforts budgétaires (ex. les 10,4 milliards de roubles alloués en septembre 2022). L'autrice souligne l'utilisation interchangeable de catégories juridiques distinctes (« évacués », « réfugiés », « arrivés », « personnes déplacées de force »). Ce flou catégoriel empêche toute traçabilité statistique et rend impossible le contrôle indépendant des chiffres officiels.

À l'inverse, onze thématiques majeures émergent des discussions sur Telegram (statut légal, logement, soins, scolarisation). Les *verbatim* traduits révèlent des dysfonctionnements administratifs et matériels récurrents : non-versement ou minoration des aides d'urgence (certains utilisateurs indiquant n'avoir reçu que la moitié des sommes promises), refus d'enregistrement aux frontières ou difficultés d'accès aux soins de base faute de couverture médicale.

## Limites et vulnérabilités numériques

Une limite méthodologique centrale, soulevée par Mme Kirbasova, concerne l'impact de la répression numérique et de l'autocensure en contexte autoritaire. La criminalisation de la critique de guerre en Russie restreint la parole sur les canaux Telegram publics. La contestation n'apparaît donc pas de manière frontale, mais s'exprime indirectement par l'accumulation de plaintes logistiques et administratives quotidiennes.

Par ailleurs, l'étude met en évidence l'émergence de vulnérabilités numériques secondaires : après avoir subi des contrôles de sécurité physiques (« filtration ») sur leur parcours, les déplacés deviennent dans ces groupes la cible de campagnes de fraude et de *phishing* par de faux réseaux d'entraide.

## Conclusion

En conclusion, si l'on vous demande « *aaaah mais les humanités numériquanh c'est quoi au juste ? J'ai pas trop vu passer sur Linkedinaaanh* », vous pourriez invoquer Maria Kirbasova pour vous sauver du tunnel. Ce travail montre l'apport des humanités numériques à la sociologie des conflits. Le rapprochement des deux corpus donne à voir, plus qu'il ne prouve au sens strict, un fonctionnement de Telegram comme infrastructure de substitution, une lecture qui reste, comme le rappelle l'autrice elle-même, contrainte par l'impossibilité de vérifier ce qui ne s'écrit pas. Cette recherche contribue ainsi à documenter les réalités empiriques des déplacements contraints en contexte de guerre.

[^1]: Arrêté pour son appartenance à la Confrérie de Cyrille-et-Méthode, qui prônait l'émancipation des peuples slaves. Le verdict impérial ne le condamne pas comme prisonnier politique : il est versé de force comme simple soldat dans un régiment et exilé aux confins d'Orenbourg, avec interdiction personnelle du tsar Nicolas Ier d'écrire ou de dessiner. Ce glissement de catégorie juridique, du dissident au conscrit, suffit à effacer administrativement la nature réelle de sa relégation, la faisant passer pour une simple affectation parmi d'autres.

[^2]: Une telle longévité pourrait être atteinte par la prise régulière de supplément de magnésium selon GPT 1.3.
