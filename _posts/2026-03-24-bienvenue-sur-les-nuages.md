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
---
## Pourquoi ce site ?

Depuis un long moment, je voulais faire un site pour partager mes expériences et contribuer à mon tour aux prolifiques communautés d'experts qu'on trouve déjà.

J'avais aussi envie de découvrir un peu plus le fonctionnement de Git et faire seul un projet complet. Le but principal pour moi était de pouvoir écrire mes articles confortablement sur [Obsidian](https://obsidian.md/) (une application de prise de notes en Markdown) qui possède un plugin Git me permettant de mettre mes articles en ligne en quelques secondes. Je voulais aussi qu'il soit accessible et assez rapide. Maintenant que je suis satisfait du résultat, c'est l'heure de m'occuper du contenu ! 😁

## Ce que vous trouverez ici

- Des articles sur **Microsoft 365**, la **Gestion des identités** et **Azure**
- Des tutoriels sur **PowerShell**, la **Power Platform** et l'**automatisation** en général
- Des retours d'expérience, sur les **certifications Microsoft**, l'**utilisation d'outils**, etc
- Ma dernière lubie du moment...

## Comment ce site fonctionne

Le site est "statique" et est construit à l'aide de Jekyll et GitHub Actions (qui construisent les pages à partir de layouts, de documents contenant les données et de mes articles en Markdown).

Sur la page "A propos" par exemple, le contenu de toutes les cartes est généré à partir de petits [documents YAML](https://github.com/Arnaud-Ferriere/SurLesNuages/tree/main/_data).  
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

Lors de la rédaction des articles en Markdown, ceux-ci ont un petit en-tête comprenant les propriétés de l'en-tête, qui permettent de construire la page de l'article :
```
---
layout: post
title: "Your article title"
date: 2025-01-15
excerpt: "Short summary shown on cards and in search."
tags: [Azure, PowerShell]
image: /assets/my-image.png       # card thumbnail + article header
banner: /assets/my-banner.jpg     # full-width header (overrides image)
# placeholder: true               # uncomment to show an "AI-generated" disclaimer
---
```

En pratique : j'écris dans Obsidian, je clique sur "Stage all → Commit → Push" dans le plugin Git, et l'article est en ligne en moins d'une minute.

Comme je ne fais jamais les choses à moitié, c'est devenu un projet complet où tout est configurable et je le mets en libre disposition sous forme de template Github : [Cirrus](https://github.com/Arnaud-Ferriere/Cirrus-for-Jekyll)  
Le ReadMe rentre plus en détail dans le fonctionnement, n'hésitez pas à l'essayer et me faire des retours via les commentaires, des Issues ou sur LinkedIn.


La liste des sujets que j'ai envie de couvrir est déjà longue, il est temps de s'y mettre !  
À bientôt pour le premier vrai article !