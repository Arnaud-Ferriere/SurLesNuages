---
title: Bienvenue sur les nuages !
date: 2026-03-24
image:
tags:
  - Jekyll
  - GitHubPages
  - Cirrus
placeholder: false
excerpt: Pourquoi ce site et les idées derrière sa conception.
layout: post
last_modified_at: 2026-04-26
---
## Pourquoi ce site ?

Depuis un long moment, je voulais faire un site pour partager mes expériences et contribuer à mon tour aux prolifiques communautés d'experts qu'on trouve un peu partout.  

J'avais aussi envie de découvrir un peu plus le fonctionnement de Git et faire seul un projet complet. Le but principal pour moi était de pouvoir écrire mes articles confortablement sur [Obsidian](https://obsidian.md/) (une application de prise de notes en **Markdown**) qui possède un plugin Git me permettant de mettre mes articles en ligne en quelques secondes. Je voulais aussi qu'il soit accessible et assez rapide. Maintenant que je suis satisfait du résultat, c'est l'heure de m'occuper du contenu ! 😁

## Ce que vous trouverez ici

- Des articles sur **Microsoft 365**, la **Gestion des identités** et **Azure**
- Des tutoriels sur **PowerShell**, la **Power Platform** et l'**automatisation** en général
- Des retours d'expérience, sur les **certifications Microsoft**, l'**utilisation d'outils**, etc
- Ma dernière lubie du moment...

## Comment ce site fonctionne

Le site est "statique" et est construit à l'aide de **Jekyll** et **GitHub Actions** (qui construisent les pages à partir de layouts, de documents contenant les données et de mes articles en Markdown).

Sur la page "[A propos](https://surlesnuages.fr/about/)" par exemple, le contenu de toutes les cartes est généré à partir de petits [documents YAML](https://github.com/Arnaud-Ferriere/SurLesNuages/tree/main/_data).  
Pour les formations, un fichier YAML ressemble à ça :
```yaml
- year: "2024"
  name: "Microsoft Power Up - Low code Maker Course"
  url: "https://www.credly.com/badges/9a01771e-a5e3-44ba-9f65-d156e97935f6/public_url"
  link_text: "Voir le badge Credly"

- year: "2023"
  name: "Autoformation \"SecNumacadémie\" - Bases de cybersécurité"
```
et ainsi de suite pour chaque ligne de formation. De cette manière si je veux mettre à jour mes formations, pas de HTML à toucher, juste le contenu du fichier YAML. GitHub Action fera alors le build automatiquement et la modification sera visible ~1 minute après.

Lors de la rédaction des articles en Markdown, ceux-ci ont un petit en-tête ("**Front Matter**") comprenant les propriétés qui permettent de construire la page de l'article :
```
---

layout: post → pour l'instant je n'ai que des articles, mais ça me sera utile si j'ai besoin d'un autre format
title: "Titre"
date → date de publication, l'article n'apparait pas sur le site avant
last_modified_at → date de mise à jour (optionnel)
excerpt → résumé pour la carte sur l'accueil
tags: [Azure, PowerShell, etc]
image: /assets/my-image.png → illustration de la carte sur l'acceuil
banner: /assets/my-banner.jpg → photo plein-largeur en en-tête du titre
difficulty  → niveau de l'article : debutant | intermediaire | avance | expert
series → nom de la série, par ex: "Bonnes pratiques Powershell" 
series_part → numéro de la partie  ex: 1
series_description → description de la série (à remplir uniquement sur l'article series_part 1)
series_expected_count → nombre total d'articles prévus (ex: 5, pour afficher "3/5" dans la page des séries)
placeholder → je fais parfois des articles de test pour tester une fonctionnalité, ça affiche un bandeau pour indiquer qu'il s'agit d'un article de test généré par IA
---
```

En pratique : j'écris dans Obsidian, je clique sur **"Stage all → Commit → Push"** dans le plugin Git, et l'article est en ligne en moins d'une minute.

Un autre avantage du Markdown : certains articles pouvant servir de documentation, la source du .md sera facilement récupérable sur mon repo Github (attention à aussi récupérer les images qui sont dans le dossier `assets/articles/NomDeLArticle`). 

Comme je ne fais jamais les choses à moitié, c'est devenu un projet complet où tout est configurable et je le mets en libre disposition sous forme de **template Github** : [Cirrus](https://github.com/Arnaud-Ferriere/Cirrus-for-Jekyll)  
Le ReadMe rentre plus en détail dans le fonctionnement, n'hésitez pas à l'essayer et me faire des retours via les commentaires, des Issues ou sur LinkedIn.

La liste des sujets que j'ai envie de couvrir est déjà longue, il est temps de s'y mettre !  
À bientôt pour le premier vrai article !