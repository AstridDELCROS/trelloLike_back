const List = require('./list');
const Card = require('./card');
const Tag = require('./tag');

// on va dire à Sequelize comment sont liées nos entités

// Association 1:N entre 2 entités
List.hasMany(Card, {
    // "cards" avec un S dans une propriété de List car il va y avoir potentiellement plusieurs cartes
    as: 'cards',
    // clef étrangère de l'entité card qui permet de l'associer à une liste
    foreignKey: 'list_id'
});

// Quand config d'association, en général on définit aussi l'association dans l'autre sens.
// Réciprocité d'un "hasMany" -> "belongsTo"
// Association N:1 entre 2 entités
Card.belongsTo(List, {
    as: 'list',
    foreignKey: 'list_id'
});

// Relation N:N, donc : association "ManyToMany"
Card.belongsToMany(Tag, {
    as: 'tags',
    through: 'card_has_tag', // table de liaison
    foreignKey: 'card_id',
    otherKey: 'tag_id',
    timestamps: false // Pas de gestion des dates
});

Tag.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_tag',
    foreignKey: 'tag_id',
    otherKey: 'card_id',
    timestamps: false
});

// export sous-forme d'objet pour recup uniquement les models nécessaires
module.exports = { List, Card, Tag };