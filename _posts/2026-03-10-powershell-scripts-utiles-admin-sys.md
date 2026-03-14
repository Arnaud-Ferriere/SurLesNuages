---
title: "5 scripts PowerShell indispensables pour un admin sys"
date: 2026-03-10
image: /assets/article2.webp
excerpt: "Une sélection de scripts PowerShell que j'utilise au quotidien pour gagner du temps en administration système."
---

En tant qu'administrateur systèmes, PowerShell est mon outil de prédilection. Voici 5 scripts que j'utilise régulièrement.

## 1. Vérifier l'état des services critiques

Un rapide tour d'horizon des services essentiels sur un serveur Windows :

```powershell
$services = @("DNS", "ADWS", "Netlogon", "W32Time")
foreach ($svc in $services) {
    Get-Service -Name $svc | Select-Object Name, Status
}
```

## 2. Exporter les utilisateurs AD inactifs

Identifier les comptes qui ne se sont pas connectés depuis 90 jours :

```powershell
$inactifs = Get-ADUser -Filter * -Properties LastLogonDate |
    Where-Object { $_.LastLogonDate -lt (Get-Date).AddDays(-90) }
$inactifs | Export-Csv -Path ".\utilisateurs-inactifs.csv" -NoTypeInformation
```

## 3. Surveiller l'espace disque

Un check rapide de l'espace disque restant sur les serveurs :

```powershell
Get-WmiObject Win32_LogicalDisk -Filter "DriveType=3" |
    Select-Object DeviceID,
        @{N="Taille (Go)"; E={[math]::Round($_.Size/1GB,2)}},
        @{N="Libre (Go)"; E={[math]::Round($_.FreeSpace/1GB,2)}}
```

## 4. Redémarrer un service à distance

Pratique pour les interventions sans RDP :

```powershell
Invoke-Command -ComputerName "SRV01" -ScriptBlock {
    Restart-Service -Name "Spooler" -Force
}
```

## 5. Lister les GPO non liées

Pour faire le ménage dans les stratégies de groupe :

```powershell
Get-GPO -All | Where-Object {
    ($_ | Get-GPOReport -ReportType XML | Select-String "LinksTo").Count -eq 0
} | Select-Object DisplayName, CreationTime
```

Ces scripts sont un bon point de départ. N'hésitez pas à les adapter à votre environnement !
