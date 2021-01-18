const sequelize = require('../database');

const { Model, DataTypes } = require('sequelize');

class List extends Model { }

// List hérite des outils de Model, notamment des méthodes statiques (Model non instanciée)
List.init({
    // 1er argument : définit structure du model (la table)
    name: DataTypes.TEXT,
    position: DataTypes.INTEGER
}, {
    // 2ème argument : définit options -> 2 obligatoires :
    sequelize, //le connecteur de BDD
    tableName: 'list' // Le nom de la table dans la BDD
});

module.exports = List;