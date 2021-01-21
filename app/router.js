const express = require('express');

const router = express.Router();

const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');

router.get('/lists', listController.getAllLists);
router.get('/lists/:id', listController.getOneList);
router.post('/lists', listController.createList);
router.patch('/lists/:id', listController.updateList);
router.delete('/lists/:id', listController.deleteList);

router.get('/lists/:id/cards', cardController.getAllCardsOfAList);
router.get('/cards/:id', cardController.getOneCard);
router.post('/cards', cardController.createCard);
router.patch('/cards/:id', cardController.updateCard);
router.delete('/cards/:id', cardController.deleteCard);

router.get('/tags', tagController.getAllTags);
router.post('/tags', tagController.createTag);
router.patch('/tags/:id', tagController.updateTag);
router.delete('/tags/:id', tagController.deleteTag);
router.post('/cards/:id/tags', tagController.hadTagToCard);
router.delete('/cards/:id/tags/:id', tagController.removeTagFromCards);

module.exports = router;