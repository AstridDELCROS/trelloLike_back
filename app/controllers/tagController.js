const { Tag } = require('../models');

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

}