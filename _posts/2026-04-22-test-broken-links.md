---
title: "Test — vérification des liens cassés"
date: 2026-04-22
tags:
  - Test
  - CI/CD
difficulty: debutant
placeholder: true
excerpt: "Article de test pour valider le workflow GitHub Actions de vérification des liens cassés. À supprimer après validation."
layout: post
---

## À quoi sert cet article ?

Cet article sert à **tester le workflow GitHub Actions** de vérification automatique des liens cassés. Il contient un mélange volontaire de liens valides et de liens cassés.

Une fois le workflow validé, **cet article sera supprimé**.

## Liens qui doivent passer ✅

Ces liens existent et devraient être validés sans problème :

- [Google France](https://www.google.fr/)
- [Site officiel de Jekyll](https://jekyllrb.com/)
- [Documentation GitHub Actions](https://docs.github.com/en/actions)
- [Bootstrap 5](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [Mon autre article sur Mermaid](/articles/presentation-mermaid/)
- [Mon article de bienvenue](/articles/bienvenue-sur-les-nuages/)

## Liens qui doivent être détectés comme cassés ❌

### Lien externe vers un domaine inexistant

- [Domaine qui n'existe pas](https://ce-domaine-nexiste-absolument-pas-123456789.com/)

### Lien externe vers une page 404

- [Page 404 sur GitHub](https://github.com/Arnaud-Ferriere/cette-page-nexiste-pas-test-lychee)

### Lien interne cassé

- [Article inexistant](/articles/un-article-qui-nexiste-pas/)

### Image cassée

Une image qui ne se chargera pas :

![Image cassée](/assets/articles/cette-image-nexiste-pas.png)

## Attendu

Après push, le workflow `broken-links.yml` devrait :

1. Builder le site
2. Détecter **4 liens cassés** (3 liens + 1 image)
3. Créer une issue GitHub avec le rapport détaillé
4. Ne PAS faire échouer le workflow (status vert, mais issue ouverte)
