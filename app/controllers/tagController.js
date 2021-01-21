const { Tag, Card } = require('../models');

module.exports = {
    getAllTags: async (_, response, next) => {
        try {
            const tags = await Tag.findAll({
                order: [
                    ['name', 'ASC']
                ]
            });
            response.json(tags);
        } catch (error) {
            next(error);
        }
    },

    createTag: async (request, response, next) => {
        const data = request.body;
        try {
            const newTag = await Tag.create(data);
            response.json(newTag);
        } catch (error) {
            next(error);
        }
    },

    updateTag: async (request, response, next) => {
        const id = Number(request.params.id);
        const data = request.body;
        try {
            const tag = await Tag.findByPk(id);
            for (const element in data) {
                tag[element] = data[element];
            }
            await tag.save();
            response.json(tag);
        } catch (error) {
            next(error);
        }
    },

    deleteTag: async (request, response, next) => {
        const id = Number(request.params.id);
        try {
            const tag = await Tag.findByPk(id);
            await tag.destroy();
            response.json('tag deleted');
        } catch (error) {
            next(error);
        }
    },

    hadTagToCard: async (request, response, next) => {
        const cardId = Number(request.params.id);
        const tagId = Number(request.body.tag_id);
        try {
            const card = await Card.findByPk(cardId, {
                include: 'tags'
            });
            const tag = await Tag.findByPk(tagId);
            await card.addTag(tag);
            // refaire select pour màj des associations
            card = await Card.findByPk(cardId, {
                include: 'tags'
            });
            response.json(card);
        } catch (error) {
            next(error);
        }
    },

    removeTagFromCards: async (request, response, next) => {
        const cardId = Number(request.params.id);
        const tagId = Number(request.body.tag_id);
        try {
            const card = await Card.findByPk(cardId, {
                include: 'tags'
            });
            const tag = await Tag.findByPk(tagId);
            await card.destroy();
            card = await Card.findByPk(cardId, {
                include: 'tags'
            });
            response.json(card);
        } catch (error) {
            next(error);
        }
    }

}