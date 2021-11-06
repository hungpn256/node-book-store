var express = require('express');
var router = express.Router();
const customer = require('../controllers/customer')

router.post('/register', customer.create);
router.post('/login', customer.login);

module.exports = router;
