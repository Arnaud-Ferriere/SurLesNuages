---
layout: post
title: "Test — Gestion des images"
date: 2026-03-15
tags: [test]
placeholder: true
---

Cet article sert à tester les différents comportements d'affichage des images dans le corps d'un article. Aucune image de carte ni de bannière n'est définie dans le front matter — l'image par défaut du site devrait apparaître sur les cartes de la page d'accueil.

## Image centrée (comportement par défaut)

Sans aucune classe, une image s'affiche centrée avec une légère ombre :

![Paysage nuageux](https://picsum.photos/seed/clouds/800/450)

Le texte reprend normalement après l'image, sans chevauchement.

## Image pleine largeur (.img-full)

Avec la classe `.img-full`, l'image prend toute la largeur de l'article :

![Datacenter](https://picsum.photos/seed/datacenter/1200/400){: .img-full}

Idéal pour les captures d'écran ou les schémas qui nécessitent beaucoup de place.

## Image flottante à gauche (.img-left)

Avec `.img-left`, le texte s'écoule à droite de l'image. Pratique pour illustrer un paragraphe sans interrompre la lecture.

![Logo cloud](https://picsum.photos/seed/azure/400/300){: .img-left}

Microsoft Azure est une plateforme de cloud computing qui propose une large gamme de services : calcul, stockage, bases de données, intelligence artificielle, réseaux, et bien plus encore. Les entreprises l'adoptent massivement pour sa flexibilité et son intégration native avec l'écosystème Microsoft 365 et Active Directory. Ce paragraphe est suffisamment long pour que l'effet de flottant soit bien visible autour de l'image positionnée à gauche.

## Image flottante à droite (.img-right)

Même principe avec `.img-right` — l'image se positionne à droite et le texte s'écoule à gauche.

![Serveurs](https://picsum.photos/seed/servers/400/300){: .img-right}

L'administration système moderne ne se limite plus à gérer des serveurs physiques. Les architectures hybrides combinent infrastructure on-premise et services cloud, nécessitant une expertise transversale : réseau, sécurité, automatisation, surveillance. Ce paragraphe illustre bien le comportement du texte qui entoure une image flottante à droite.

## Plusieurs images côte à côte

Il est aussi possible d'insérer plusieurs images consécutives. Elles s'affichent chacune centrée, avec une marge verticale entre elles :

![Image 1](https://picsum.photos/seed/anetwork/600/350)

![Image 2](https://picsum.photos/seed/linux/600/350)

## Conclusion

Les différentes classes permettent de varier les mises en page selon le contexte. Sur mobile, les flottants (`.img-left` et `.img-right`) reviennent automatiquement en mode centré pour éviter que le texte soit trop écrasé.
