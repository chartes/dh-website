---
title: "Dynamique de la transmission des manuscrits et travaux patristiques dans la péninsule ibérique (IV–VIe siècles)"
date: 2025-06-27
draft: false
description: "Compte-rendu du lightning-talk M2 d'Émilie Guidi par Philippe Chaumet-Riffaud (M1) — modélisation stochastique (Yule, Poisson) de la transmission des manuscrits patristiques dans la péninsule ibérique."
category: "compte-rendu"
event_tag: "Journée d'étude HN 2025"
author_m1: "Philippe Chaumet-Riffaud"
subject_m2: "Émilie Guidi"
poster_title: "Dynamique de la transmission des manuscrits et travaux patristiques dans la péninsule ibérique (IV–VIe siècles)"
image: "images/blog/je2025/emilie-guidi/fig1.jpg"
type: "post"
---

<p class="actu-chapeau">
Compte-rendu par <strong>Philippe Chaumet-Riffaud (M1)</strong> du lightning-talk d&rsquo;<strong>Émilie Guidi (M2)</strong> présenté lors de la journée d&rsquo;étude du master, 27 juin 2025 (séminaire de recherche 2024-2025, associé au colloque <em>Bridging Computational Humanities and Computational Social Sciences</em> organisé par AISSAI — Marie Puren et Florian Cafiero — et l&rsquo;ENC — Chahan Vidal-Gorène). Mémoire sous la direction de Jean-Baptiste Camps et François Ploton-Nicollet.</p>

Le sujet du mémoire était « d'évaluer l'emploi d'approches quantitatives pour décrire et modéliser la dynamique complexe de transmission des manuscrits patristiques ».

Ce travail s'est concentré sur la transmission des textes patristiques dans la péninsule ibérique, à l'ère patristique primitive c'est-à-dire entre la moitié du IIIe siècle et du Ve siècle. Le corpus comprenait un dataset en format CSV et des stemmata en format `.dot` provenant d'une recherche manuelle (catalogues, bibliothèques, requêtes web…).

Un premier modèle probabiliste (Kestemont et al., 2021) a été employé pour fournir des estimateurs de l'abondance et de la diversité, ainsi que de la complétude et de l'équilibre d'un corpus. Les résultats de 6 estimateurs pour l'abondance estimée ont été présentés. Un second modèle s'est appuyé sur des processus stochastiques (Poisson et Yule). Les paramètres extraits de ces deux méthodes ont été présentés dans un tableau lors de la présentation. Des instruments bayésiens ont été utilisés pour tester les paramètres du modèle.

Les courbes de profil de diversité pour analyser la représentation des textes (comme la courbe *e-profile*, agrégeant les estimateurs de Shannon-Weaver ou Simpson), indiquent un processus non équilibré où certains textes sont surreprésentés et d'autres très rares.

![Fig. 1 — Courbes de profil de diversité](/images/blog/je2025/emilie-guidi/fig1.jpg)

La courbe d'extrapolation suggérait que 7 465 manuscrits étaient encore manquants pour une couverture complète.

![Fig. 2 — Courbe d'extrapolation et manuscrits manquants estimés](/images/blog/je2025/emilie-guidi/fig2.jpg)

Les premiers résultats avec le modèle de Yule ont été non concluants. En effet, ce modèle, conçu pour des traditions médiévales (XIIe-XVe siècles) où création et copie sont simultanées, ne s'adapte pas bien à la période étudiée (textes écrits du IIIe au Ve siècle de notre ère, copie prolongée). Cela a conduit à une explosion de la population en raison d'une période trop longue.

La proposition présentée en conclusion était de combiner les processus de Yule et de Poisson pour améliorer le modèle : une phase de Yule (création et copie, IIIe-Ve siècles) suivie d'une phase de Poisson (copie seule), nécessitant un travail supplémentaire de développement.
