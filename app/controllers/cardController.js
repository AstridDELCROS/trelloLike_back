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

    getOneCard: async (request, response, next) => {
        const id = Number(request.params.id);
        try {
            const card = await Card.findByPk(id, {
                include: 'tags',
            });
            response.json(card);
        } catch (error) {
            next(error);
        }
    },

    createCard: async (request, response, next) => {
        const data = request.body;
        try {
            const newCard = await Card.create(data);
            response.json(newCard);
        } catch (error) {
            next(error);
        }
    },

    updateCard: async (request, response, next) => {
        const id = Number(request.params.id);
        const data = request.body;
        try {
            const card = await Card.findByPk(id);
            for (const element in data) {
                card[element] = data[element];
            }
            await card.save();
            response.json(card);
        } catch (error) {
            next(error);
        }
    },

    deleteCard: async (request, response, next) => {
        const id = Number(request.params.id);
        try {
            const card = await Card.findByPk(id);
            await card.destroy();
            response.json('card deleted');
        } catch (error) {
            next(error);
        }
    },

}