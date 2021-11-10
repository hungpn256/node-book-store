var express = require('express');
var router = express.Router();
var order = require('../controllers/order')
const middleware = require('../middleware/index')

router.get('/get-cart', middleware.requireSignin, order.getCurrentCard)
router.post('/add-to-cart', middleware.requireSignin, order.addToCart)

module.exports = router;
