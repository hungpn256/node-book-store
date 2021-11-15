var express = require('express');
var router = express.Router();
var order = require('../controllers/order')
const middleware = require('../middleware/index')

router.get('/get-cart', middleware.requireSignin, order.getCurrentCard)
router.post('/add-to-cart', middleware.requireSignin, order.addToCart)
router.get('/payment', order.getAllPayment)
router.get('/shipment', order.getAllShipment)
router.post('/create-order', middleware.requireSignin, order.createOrder)
router.get('/my-order', middleware.requireSignin, order.getMyOrder)
router.get('/my-order/:id', middleware.requireSignin, order.getOrderDetail)

module.exports = router;
