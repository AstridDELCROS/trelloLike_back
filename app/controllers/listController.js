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

    getOneList: async (request, response, next) => {
        const id = Number(request.params.id);
        try {
            const list = await List.findByPk(id, {
               include: {
                   association: 'cards',
                   include: 'tags'
               }, 
            });
            response.json(list);
        } catch (error) {
            next(error);
        }
    },

    createList: async (request, response, next) => {
        const data = request.body;
        try {
            const newList = await List.create(data);
            response.json(newList);
        } catch (error) {
            next(error);
        }
    },

    updateList: async (request, response, next) => {
        const id = Number(request.params.id);
        const data = request.body;
        try {
            const list = await List.findByPk(id);
            for (const element in data) {
                list[element] = data[element];
            }
            await list.save();
            response.json(list);
        } catch (error) {
            next(error);
        }
    },

    deleteList: async (request, response, next) => {
        const id = Number(request.params.id);
        try {
            const list = await List.findByPk(id);
            await list.destroy();
            response.json('list deleted');
        } catch (error) {
            next(error);
        }
    },

}