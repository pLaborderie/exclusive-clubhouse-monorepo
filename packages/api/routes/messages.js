var express = require('express');
var router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.getMessages);
router.post('/create', messageController.createMessage);

module.exports = router;
