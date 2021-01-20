const { List } = require('../models');

module.exports = {
    getAllLists: async (_, response, next) => {
        try {
            const lists = await List.findAll({
                include: {
                    association: 'cards',
                    include: 'tags'
                },
                order: [ // https://sequelize.org/master/manual/model-querying-basics.html#ordering
                    ['position', 'ASC'],
                    // Will order by an associated model's createdAt using the name of the association.
                    // ['Task', 'createdAt', 'DESC'],
                    ['cards', 'position', 'ASC']
                ]
            });
            // réponse sous forme de json
            response.json(lists); // response.send(lists)
        } catch (error) {
            next(error);
        }
    },

}