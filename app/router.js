const express = require('express');

const router = express.Router();

const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');

router.get('/lists', listController.getAllLists);
router.get('/lists/:id/cards', cardController.getAllCardsOfAList);
router.get('/tags', tagController.getAllTags);

module.exports = router;