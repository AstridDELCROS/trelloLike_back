### Étape 1 : Création du MCD

**Outils** => [Mocodo](http://mocodo.wingi.net/)
- définir les cardinalités en se posant les bonnes questions :
  - _1 entité `A` est liée à combien d'entités `B` minimum ?_
    - 0 ou 1
  - _1 entité `A` est liée à combien d'entités `B` maximum ?_
    - 1 ou n
  - _1 entité `B` est liée à combien d'entités `A` minimum ?_
    - 0 ou 1
  - _1 entité `B` est liée à combien d'entités `A` maximum ?_
    - 1 ou n

##### Exemple, ici :
`LISTE: nom, position`
`APPARTIENT, 11 CARTE, 0N LISTE`
`CARTE: titre, position, couleur`
`:`
`LIBELLE: nom`
`POSSEDE, 0N CARTE, 0N LIBELLE`


### Etape 2 : Création du MLD

- Toute entité du MCD devient une table du MLD. Les propriétés de ces entités deviennent les colonnes des tables. L'identifiant de l'entité devient la clé primaire de la table.
- Si l'une des cardinalités max. vaut 1 (ici _1 CARTE), une clé étrangère est créée du côté de l'entité où se trouve le 1. Cette clé étrangère fera référence à l'identifiant dans la table associée.
- Si les deux cardinalités max. sont n, donc une relation "plusieurs à plusieurs", la relation devient une table à part entière en relation avec les deux entités. On parle de table de liaison, d'association, de jonction ou de correspondance. Cette table de liaison contient 2 clefs étrangères vers les 2 tables à lier.


### Etape 3 : Création et Connexion de la BDD

- $ psql -U nomDeLutilisateur -d nomDuneBase
- CREATE ROLE nomDuLutilisateur WITH LOGIN PASSWORD 'mdp';
- CREATE DATABASE nomDeLaBase OWNER nomDuLutilisateur;
- $ psql -U nomDeLutilisateur -d nomDeLaBase -f chemin/du/fichier.sql


### Etape 4 : Installer les modules et créer fichiers de config + models

- $ npm init -y
- $ npm install dotenv pg sequelize

- dossier : app et app/models
    - puis dans models -> list.js, card.js, tag.js et index.js (pour gérer les associations)
- fichiers : .env et app/database.js
- puis fichier test.js pour vérifier qu'on récup bien les données des models


### Etape 5 : Setup Express, modules API et premières routes (GET)

- $ npm install express cors sanitize-html
- config d'express dans index.js
- création des controllers et méthodes getAll des listes, cartes et tags
- puis config de router -> http://localhost:4000/lists


### Etape 5 : GET, POST, PATCH, DELETE

- implémenter les méthodes d'instances dans chaque controller...
- ... et les appeler dans le routeur

