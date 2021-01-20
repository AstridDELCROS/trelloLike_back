const { Card } = require('../models');

module.exports = {
    getAllCardsOfAList: async (request, response, next) => {
        const id = Number(request.params.id);
        try {
            const cards = await Card.findAll({
                where: {
                    list_id: id
                },
                include: 'tags',
                order: [
                    ['position', 'ASC'],
                ]
            });
            response.json(cards);
        } catch (error) {
            next(error);
        }
    },

}