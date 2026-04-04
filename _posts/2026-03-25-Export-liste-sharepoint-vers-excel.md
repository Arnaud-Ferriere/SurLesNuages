---
layout: post
title: Exporter une liste SharePoint dans un classeur Excel
date: 2026-03-25
excerpt: Comment réduire l'export d'une liste SharePoint vers Excel de quelques heures à moins d'une minute
tags:
  - PowerAutomate
  - CasPratique
  - Automatisation
  - Excel
  - SharePoint
  - OfficeScript
  - JSON
image: /assets/export-liste-spo-vers-excel.png
banner: /assets/banner-power-automate.svg
placeholder: false
---
## Objectif
Power Automate est souvent présenté comme un outil simple.
C'est relativement le cas, mais c'est aussi très simple de partir dans de mauvaises directions qui consument temps et ressources.  
Un exemple fréquent est l'utilisation "naïve" de boucles pour faire une action lors du parcours d'une liste SharePoint. Celle-ci est très couteuse en temps et en appels Power Automate (dans notre cas 2 par boucle pour une écriture sur un Excel, pour une liste de 4000 éléments on arrive à 8000 actions par lancement du flux !).  
En utilisant d'autres ressources, on peut très facilement diminuer le nombre d'actions (on termine avec une vingtaine peu importe le nombre de lignes de la liste source) et le temps d'exécution.  
Je présente dans cet article le flux de départ, suivi d'une première solution suffisante pour les listes SharePoint de moins de 5000 lignes et d'une taille inférieure à 5Mb, et enfin une solution robuste, évolution de la deuxième, qui conviendra même aux listes les plus chargées.
## La méthode "Naïve"

### Supprimer le contenu du tableau
### Boucles

## Une solution : un payload JSON et Office Script

### Comment

#### Commencer par vider le tableau 
```typescript 
function main(workbook: ExcelScript.Workbook) {
    const table = workbook.getTable("Tableau1");
    const nbLignes = table.getRowCount();
    if (nbLignes>0) {        table.getRangeBetweenHeaderAndTotal().delete(ExcelScript.DeleteShiftDirection.up);
    }
}
```

#### Récupérer le payload JSON et l'écrire dans le tableau
```typescript
function main(workbook: ExcelScript.Workbook, jsonData: object[]) {
  // Active la page Feuil1 et le tableau Tableau1.
  const sheet = workbook.getWorksheet("Feuil1");
  const table = workbook.getTable("Tableau1");
  sheet.activate();

  // Determine the data's shape by getting the properties in one object.
  // This assumes all the JSON objects have the same properties.
  const columnNames = getPropertiesFromJson(jsonData[0]);
  
  // Add each object in the array of JSON objects to the table.
  const tableValues = jsonData.map(row => convertJsonToRow(row));
  table.addRows(-1, tableValues);
}

/**
 * This function turns a JSON object into an array to be used as a table row.
 */
function convertJsonToRow(obj: object) {
  const array: (string | number)[] = [];

  // Loop over each property and get the value. Their order will be the same as the column headers.
  for (let value in obj) {
    array.push(obj[value]);
  }
  return array;
}

/**
 * This function gets the property names from a single JSON object.
 */
function getPropertiesFromJson(obj: object) {
  const propertyArray: string[] = [];

  // Loop over each property in the object and store the property name in an array.
  for (let property in obj) {
    propertyArray.push(property);
  }

  return propertyArray;
}
```
Inspiré de [la documentation Learn](https://learn.microsoft.com/en-us/office/dev/scripts/develop/use-json)

#### Côté Power Automate


#### Côté Office Script


### Les limites
 limitation of 5mb for requests/responses


duration of your script run: it must be lower than 120 seconds

### La gestion des erreurs

Vu les limites, il n'est pas forcément simple de se rendre compte lorsque la liste va dépasser les 5Mb. Il est donc important d'avoir une bonne gestion des erreurs.

Il est possible alors d'ajouter une action qui se déclenche après les actions qui risquent de rentrer en erreur *METTRE ICI LES ACTIONS CONCERNEES* pour envoyer une notification.

La formule suivante peut être mise dans le corps du mail, elle permet de retrouver directement le flux et son exécution en erreur :
```typescript 
concat('https://make.powerautomate.com/environments/',workflow()?['tags']['environmentName'], '/flows/', workflow()?['name'],'/runs/', workflow()?['run']['name'])
```
Elle est pas belle la vie ?
## Pour aller plus loin, la pagination maison

## Ressources externes

L'article très complet de **David Zoonekyndt** sur les filtre OD 