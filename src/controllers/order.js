const Cart = require('../models/cart');
var Card = require('../models/cart');
const CartItem = require('../models/cartItem');
const Payment = require('../models/payment');
const Shipment = require('../models/Shipment');
const _ = require('lodash');
const Order = require('../models/order');
const CartDAO = require('../dao/CartDAO');
exports.getCurrentCard = async (req, res) => {
    let card = null;
    try {
        const customer = req.customer;
        card = await CartDAO.getCurrentCart(customer.id);
    } catch (err) {
        console.log('err', err);
        if (err.kind === 'not_found') {
            card = new Card({ customerID: req.customer.id });
            card = await Card.create(card);
        }
    }
    if (card !== null) {
        let listItem = await CartDAO.getCardItemByCardID(card.id);
        card.listCartItem = listItem;
        res.send(card);
    } else {
        res.status(400).send(err);
    }
};

exports.addToCart = async (req, res) => {
    let card = null;
    try {
        const customer = req.customer;
        card = await CartDAO.getCurrentCart(customer.id);
    } catch (err) {
        console.log('err', err);
        if (err.kind === 'not_found') {
            card = new Card({ customerID: req.customer.id });
            card = await CartDAO.createCart(card);
        }
    }
    if (card !== null) {
        const cartItem = req.body;
        let cartExist = await CartDAO.checkCartExist(cartItem);
        if (cartExist) {
            cartExist.quantity = cartExist.quantity + cartItem.quantity;
            console.log(cartExist);
            await CartDAO.update(cartExist);
        } else {
            await CartDAO.create(req.body);
        }
        let listItem = await CartDAO.getCardItemByCardID(card.id);
        card.listCartItem = listItem;
        console.log(card);
        res.send(card);
    }
};
exports.getAllPayment = async (req, res) => {
    try {
        let id = req.query.id
        console.log(id);
        let payments = await CartDAO.getAllPayment(id);
        res.send(payments)
    }
    catch (err) {
        console.log(err, 'err')
        res.status(400).send(err)
    }
}

exports.getAllShipment = async (req, res) => {
    try {
        let shipments = await CartDAO.getAllShipment();
        res.send(shipments)
    }
    catch (err) {
        res.status(400).send(err)
    }
}
exports.createOrder = async (req, res) => {
    try {
        console.log(req.body);
        const cartID = req.body.cartID;
        const paymentID = req.body.paymentID;
        const shipmentID = req.body.shipmentID;
        const listCartPaid = req.body.listCartItem;
        await CartDAO.updateStatusCart(cartID)
        let newCart = new Card({ customerID: req.customer.id });
        newCart = await CartDAO.createCart(newCart);
        let listItem = await CartDAO.getCardItemByCardID(cartID);
        const listCartItemAddNewCart = _.differenceBy(listItem, listCartPaid, 'id')
        await Promise.all(listCartItemAddNewCart.map(item => {
            item.cartID = newCart.id
            return CartDAO.update(item)
        }))
        newCart.listCartItem = listItem
        await CartDAO.createOrder({ cartID, paymentID, shipmentID, status: 'paid', dateCreat: new Date() })
        res.send({ cart: newCart })
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

exports.getMyOrder = async (req, res) => {
    try {
        const customerID = req.customer.id
        let result = await CartDAO.getAllOrderByCustomerId(customerID)
        const listCart = await Promise.all(result.map((item) => {
            return CartDAO.getCardItemByCardID(item.cartID)
        }))
        result = result.map((item, index) => {
            const image = listCart[index][0].bookItem.image
            const total = Math.round(listCart[index].reduce((sum, item) => sum + item.bookItem.price, 0))
            console.log(image, total);
            return {
                ...item,
                image,
                total
            }
        })
        res.send(result)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}
exports.getOrderDetail = async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}