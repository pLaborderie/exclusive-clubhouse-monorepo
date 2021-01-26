var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.listUsers);
router.get('/current-user', userController.getCurrentUser);
router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);

module.exports = router;
