const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        underscored: true, // Pour dire à sequelize qu'on utilise une convention de nommage en snake_case
        // Pour modifier le nom de la propriété des champs en sortie de requête sequelize, on précise des correspondances
        createdAt: 'created_at',
        updatedAt : 'updated_at'
    }
});

module.exports = sequelize;