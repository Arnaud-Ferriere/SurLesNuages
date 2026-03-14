---
title: "Monter un homelab : pourquoi et comment commencer"
date: 2026-02-10
image: /assets/article1.webp
tags: [Homelab, Virtualisation, Administration]
placeholder: true
excerpt: "Comment j'ai monté mon homelab pour pratiquer et expérimenter, et pourquoi c'est un atout majeur pour un admin sys."
---

Un homelab, c'est un environnement informatique personnel où l'on peut expérimenter librement. Voici pourquoi j'en ai monté un et comment vous pouvez faire pareil.

## Pourquoi un homelab ?

En tant qu'admin sys, on ne peut pas tester des configurations risquées en production. Un homelab permet de :

- **Pratiquer** sans conséquences (casser et recommencer)
- **Préparer des certifications** avec un environnement réel
- **Tester des outils** avant de les proposer en entreprise
- **Apprendre** de nouvelles technologies à son rythme

## Mon setup

Pas besoin d'un datacenter ! Mon homelab tourne sur :
- Un mini PC avec 32 Go de RAM
- **Proxmox** comme hyperviseur (gratuit et open source)
- Plusieurs VMs : Windows Server, Linux, pfSense

Le tout consomme moins qu'une ampoule et reste silencieux.

## Les VMs essentielles pour un admin sys

### Active Directory

Un domaine AD de test avec :
- Un contrôleur de domaine principal
- Un DC secondaire pour tester la réplication
- Des utilisateurs et GPO de test

### Serveur Linux

Pour héberger des services : reverse proxy (Nginx), monitoring (Grafana), conteneurs Docker...

### Firewall

pfSense ou OPNsense pour apprendre le réseau et la segmentation (VLANs, règles de pare-feu).

## Conseils pour débuter

1. **Commencez petit** : un seul PC suffit
2. **Utilisez la virtualisation** : Proxmox, Hyper-V ou VirtualBox
3. **Documentez tout** : prenez des notes sur vos configurations
4. **Automatisez** : c'est l'occasion de pratiquer PowerShell, Ansible...
5. **Rejoignez la communauté** : r/homelab sur Reddit est une mine d'or

## Le coût

On peut démarrer gratuitement avec VirtualBox sur un PC existant. Pour un setup dédié, comptez entre 200 et 500 euros pour un mini PC d'occasion avec suffisamment de RAM.

Les licences Windows Server sont disponibles en évaluation (180 jours) et Proxmox est gratuit.

## Conclusion

Un homelab est un investissement dans votre carrière. C'est mon terrain de jeu favori et il m'a permis de monter en compétences bien plus vite que la théorie seule. Lancez-vous !
