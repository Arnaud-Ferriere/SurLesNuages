---
layout: post
title: Exporter une liste SharePoint dans un classeur Excel
date: 2026-03-19
excerpt: Automatiser l'export rapide d'une liste SharePoint vers Excel en utilisant le minimum de ressources
tags:
  - PowerAutomate
  - CasPratique
  - Automatisation
  - Excel
  - SharePoint
  - OfficeScript
  - JSON
image: /assets/export-liste-spo-vers-excel.png
banner: ""
placeholder: false
---
## Objectif
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
![](/assets/Image.png)
![](/assets/Image%20(1).png)
![](/assets/Image%20(2).png)
### La gestion des erreurs

### Les limites
 limitation of 5mb for requests/responses


duration of your script run: it must be lower than 120 seconds

## Pour aller plus loin
<!--
FRONT MATTER :

IMAGES DANS LE CORPS :
  ![Description](/assets/nom-image.png)          ← centrée par défaut
  ![Description](/assets/nom-image.png){: .img-left}   ← flottante gauche
  ![Description](/assets/nom-image.png){: .img-right}  ← flottante droite
  ![Description](/assets/nom-image.png){: .img-full}   ← pleine largeur
-->
