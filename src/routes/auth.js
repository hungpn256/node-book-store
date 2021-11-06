var express = require('express');
var router = express.Router();
const customer = require('../controllers/customer')
const middleware = require('../middleware/index')
router.post('/register', customer.create);
router.post('/login', customer.login);
router.get('/me', middleware.requireSignin, customer.getMe);

module.exports = router;
