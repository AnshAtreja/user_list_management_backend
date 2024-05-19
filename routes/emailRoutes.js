const express = require('express');
const emailController = require('../controllers/emailController');

const router = express.Router();

router.post('/:listId/send-emails', emailController.sendEmails);
router.post('/:listId/unsubscribe', emailController.unsubscribe);

module.exports = router;
