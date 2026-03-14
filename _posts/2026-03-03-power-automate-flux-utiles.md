---
title: "3 flux Power Automate pour gagner du temps au bureau"
date: 2026-03-03
image: /assets/article1.webp
tags: [Power Automate, Microsoft 365, Automatisation]
placeholder: true
excerpt: "Des exemples concrets de flux Power Automate pour automatiser vos tâches quotidiennes sans écrire une ligne de code."
---

Power Automate est un outil formidable pour automatiser les tâches répétitives. Voici 3 flux que j'ai mis en place et qui font gagner un temps précieux.

## 1. Notification Teams sur nouveau ticket

Quand un e-mail arrive dans une boîte partagée avec le mot "urgent" dans l'objet, un message est automatiquement posté dans un canal Teams.

**Déclencheur** : À la réception d'un e-mail
**Condition** : L'objet contient "urgent"
**Action** : Poster un message dans Teams avec le résumé

Résultat : plus besoin de surveiller la boîte mail en permanence, l'équipe est alertée instantanément.

## 2. Approbation de demandes de congés

Un flux classique mais très efficace :

1. L'employé remplit un **formulaire Microsoft Forms**
2. Power Automate envoie une **demande d'approbation** au manager
3. Le manager approuve ou refuse depuis Teams ou Outlook
4. L'employé reçoit la réponse par e-mail
5. Un **fichier Excel** est mis à jour automatiquement

Ce flux remplace des échanges d'e-mails interminables par un processus structuré.

## 3. Sauvegarde automatique des pièces jointes

Chaque pièce jointe reçue sur une boîte spécifique est automatiquement enregistrée dans un dossier SharePoint, organisé par date.

**Déclencheur** : Nouvel e-mail avec pièce jointe
**Actions** :
- Créer un dossier avec la date du jour
- Enregistrer chaque pièce jointe dans ce dossier
- Renommer le fichier avec l'expéditeur et la date

Fini les pièces jointes perdues dans les méandres d'Outlook !

## Conseils pour bien démarrer

- Commencez par des flux simples et testez-les
- Utilisez les **modèles** proposés par Microsoft comme base
- Pensez à gérer les **erreurs** (un flux sans gestion d'erreur finira par poser problème)
- Documentez vos flux pour vos collègues

Power Automate est accessible à tous, pas besoin d'être développeur. C'est un excellent levier pour moderniser les processus d'une équipe.
