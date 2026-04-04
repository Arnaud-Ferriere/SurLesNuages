---
title: "Test Mermaid : diagrammes dans les articles"
date: 2026-04-04
image:
tags:
  - Cirrus
  - Jekyll
mermaid: true
placeholder: false
excerpt: Un article de test pour valider le rendu des diagrammes Mermaid — flowcharts, séquences et diagrammes d'état.
layout: post
---

Cet article sert à valider le support des diagrammes [Mermaid](https://mermaid.js.org/) sur le site. Les blocs de code avec le langage `mermaid` sont automatiquement convertis en SVG interactifs — et le thème suit le mode sombre !

## Flowchart — flux Power Automate

Un exemple représentant un flux d'approbation typique sous Power Automate :

```mermaid
flowchart TD
    A([Déclencheur\nNouvelle demande]) --> B[Récupérer les\ninfos du demandeur]
    B --> C[Envoyer une demande\nd'approbation]
    C --> D{Réponse du\nvalidateur}
    D -- Approuvé --> E[Créer l'élément\ndans SharePoint]
    D -- Refusé --> F[Notifier le\ndemandeur]
    E --> G[Envoyer email\nde confirmation]
    F --> H([Fin])
    G --> H
```

## Diagramme de séquence — authentification Azure AD

Exemple d'un flux OAuth 2.0 avec Azure AD :

```mermaid
sequenceDiagram
    actor U as Utilisateur
    participant A as Application
    participant AAD as Azure AD
    participant API as API Graph

    U->>A: Connexion
    A->>AAD: Demande d'autorisation
    AAD-->>U: Page de connexion
    U->>AAD: Identifiants + MFA
    AAD-->>A: Code d'autorisation
    A->>AAD: Échange contre un token
    AAD-->>A: Access token + Refresh token
    A->>API: Requête avec token
    API-->>A: Données utilisateur
    A-->>U: Accès accordé
```

## Diagramme d'état — cycle de vie d'un ticket

```mermaid
stateDiagram-v2
    [*] --> Nouveau
    Nouveau --> EnCours : Assignation
    EnCours --> EnAttente : Blocage externe
    EnAttente --> EnCours : Déblocage
    EnCours --> Résolu : Correction appliquée
    Résolu --> Fermé : Validation client
    Résolu --> EnCours : Réouverture
    Fermé --> [*]
```

---

Si tu lis cet article, les trois diagrammes ci-dessus devraient s'afficher correctement — et passer en thème sombre si tu actives le mode nuit 🌙
