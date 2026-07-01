---
title: "Women representation in Arabic and French travel narratives: a NLP-based study"
date: 2026-05-19
draft: false
description: "Compte-rendu du poster M2 de Radjaa Benabdallah par Irandokht Dina Moinzadeh (M1) — comparaison des représentations féminines dans les récits de voyage arabophones et francophones."
category: "compte-rendu"
event_tag: "Journée d'étude HN 2026"
author_m1: "Irandokht Dina Moinzadeh"
subject_m2: "Radjaa Benabdallah"
poster_title: "Women representation in Arabic and French travel narratives: a NLP-based study"
type: "post"
---

> Compte-rendu par **Irandokht Dina Moinzadeh (M1)** du poster de **Radjaa Benabdallah (M2)** présenté lors de la journée d'étude du master, 19 mai 2026 (Computational Cultural Science Workshop, dans le cadre de la conférence Humanistica).

La séance de posters du 19 mai 2026 nous a permis de découvrir le poster de Radjaa Benabdallah, portant sur la représentation des femmes dans les récits de voyage arabophones et francophones.

Intitulé « Women representation in Arabic and French travel narratives: a NLP-based study », ce poster, qui s'inscrit dans le cadre d'un mémoire de master 2, explore la manière dont les femmes sont représentées dans des récits de voyage en arabe et en français, à la croisée des discours coloniaux et interculturels. Radjaa Benabdallah interroge ainsi la façon dont l'annotation automatique et l'annotation manuelle façonnent différemment cette représentation selon la langue du corpus.

Le corpus mobilisé est bilingue et s'étend de 1853 à 1992. Le corpus arabophone réunit quatre auteurs, dont une autrice, tandis que le corpus francophone comprend quatre auteurs, dont deux autrices. Pour analyser ces textes, Radjaa Benabdallah mobilise des outils de NLP, en premier lieu spaCy, qu'elle combine à des annotations manuelles réalisées sous Label Studio, ainsi qu'à des analyses contextuelles portant sur les adjectifs, les lieux, et une forme d'analyse de sentiment.

La problématique centrale de la recherche consiste à relever, dans chacun des deux corpus, l'ensemble des mentions désignant des femmes, puis à comparer la manière dont ces mentions sont construites et qualifiées d'une langue à l'autre. Pour y répondre, Radjaa Benabdallah a mis en place deux pipelines distincts. Le pipeline français a pu s'appuyer sur une analyse automatique via spaCy pour l'extraction des entités nommées. Le pipeline arabe, en revanche, a nécessité une annotation manuelle systématique, spaCy se révélant limité face aux spécificités de la langue arabe : absence de majuscules, ambiguïté lexicale, absence de diacritiques, agglutination des mots, et fréquence des références indirectes aux femmes. Ce constat met en lumière une difficulté plus large, à savoir l'inadaptation des grands outils de NLP aux langues qui, comme l'arabe, ne s'écrivent pas en alphabet latin.

Les résultats font apparaître un premier paradoxe. C'est dans le corpus français que la majorité des entités nommées désignant des femmes sont recensées, ce qui s'explique en partie par une plus grande présence de femmes dans ce corpus ; les deux autrices y concentrent à elles seules la majorité des entités. Dans le corpus arabophone, à l'inverse, les femmes sont plus souvent évoquées de loin, et c'est la seule écrivaine du corpus, Nawal El Saadawi, qui concentre 41,6 % des entités nommées relevées.

Au-delà de ce paradoxe quantitatif, l'analyse qualitative tend à confirmer la persistance d'un regard orientaliste dans les textes français, quel que soit le genre de leur auteur. On y retrouve un champ lexical du contrôle et de l'enfermement, ainsi qu'une insistance sur un désir supposé d'assimilation des femmes représentées à la femme française. À l'inverse, le regard porté par les auteurs arabophones donne à voir des femmes davantage présentes dans les espaces publics et intellectuels, associées à la beauté et à la jeunesse : les verbes d'action y suggèrent la mobilité et la visibilité, tandis que les champs lexicaux mobilisés mettent l'accent sur la féminité et l'attraction.

Ainsi, Radjaa Benabdallah mobilise conjointement des outils de NLP et un travail d'annotation manuelle pour mettre en regard deux corpus, et montre la pérennité d'un regard orientaliste dans les récits de voyage français, tout en révélant, en miroir, une manière radicalement différente de représenter les femmes du côté arabophone. Ce travail souligne par ailleurs la nécessité d'adapter les grands outils de NLP aux langues minoritaires, mais aussi à celles qui, comme l'arabe, ne disposent pas de l'alphabet latin et posent des défis spécifiques (agglutination, absence de majuscules), encore trop souvent négligés par les pipelines standards.
