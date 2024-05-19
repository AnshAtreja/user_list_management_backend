const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/:listId/users', upload.single('file'), userController.addUsers);

module.exports = router;
