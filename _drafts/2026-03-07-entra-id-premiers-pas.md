---
title: "Entra ID : par où commencer ?"
date: 2026-03-07
image: /assets/article3.webp
tags: [Entra ID, Azure, Identité]
placeholder: true
excerpt: "Un guide pour comprendre les bases de Microsoft Entra ID et démarrer avec la gestion des identités cloud."
---

Microsoft Entra ID (anciennement Azure AD) est le service de gestion des identités cloud de Microsoft. Si vous débutez, voici les concepts essentiels.

## Qu'est-ce qu'Entra ID ?

Entra ID est un annuaire cloud qui gère l'authentification et les autorisations de vos utilisateurs. Il remplace progressivement l'Active Directory traditionnel pour les scénarios cloud et hybrides.

## Les concepts clés

### Tenant

C'est votre espace dédié dans Entra ID. Chaque organisation possède son propre tenant, identifié par un domaine (ex: `monentreprise.onmicrosoft.com`).

### Utilisateurs et groupes

Comme dans un AD classique, vous gérez des utilisateurs et des groupes. La différence : tout est dans le cloud, accessible de partout.

### Applications d'entreprise

Entra ID permet le **Single Sign-On (SSO)** avec des milliers d'applications SaaS. Vos utilisateurs se connectent une fois et accèdent à tout.

## Environnement hybride

La plupart des entreprises ne sont pas 100% cloud. C'est là qu'intervient **Entra Connect** (anciennement Azure AD Connect) : il synchronise votre AD on-premise avec Entra ID.

Les points d'attention :
- Planifiez vos **UPN** avant la synchronisation
- Testez d'abord en mode **staging**
- Configurez le **Password Hash Sync** ou le **Pass-Through Authentication**

## Licences

Entra ID existe en plusieurs versions :
- **Free** : inclus avec Microsoft 365
- **P1** : accès conditionnel, groupes dynamiques
- **P2** : Identity Protection, PIM (Privileged Identity Management)

## Par où commencer ?

1. Explorez le portail [entra.microsoft.com](https://entra.microsoft.com)
2. Créez quelques utilisateurs de test
3. Configurez l'authentification multifacteur (MFA)
4. Testez l'accès conditionnel

La gestion des identités est un pilier de la sécurité. Maîtriser Entra ID est devenu incontournable pour tout admin sys travaillant avec l'écosystème Microsoft.
