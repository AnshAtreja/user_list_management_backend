const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router();

router.post('/', listController.createList);
router.delete('/:listId', listController.deleteList);

module.exports = router;
