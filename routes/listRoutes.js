const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router();

router.post('/create', listController.createList);

//Not needed according to requirements of the task, created for testing purposes
// router.delete('/delete/:listId', listController.deleteList);

module.exports = router;
