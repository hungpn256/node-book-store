const Cart = require('../models/cart');
var Card = require('../models/cart');
const CartItem = require('../models/cartItem');
const Payment = require('../models/payment');
const Shipment = require('../models/Shipment');
const _ = require('lodash');
const Order = require('../models/order');
const OrderDAO = require('../dao/OrderDAO');
const CustomerDAO = require('../dao/CustomerDAO');
exports.getCurrentCard = async (req, res) => {
    let card = null;
    try {
        const customer = req.customer;
        card = await OrderDAO.getCurrentCart(customer.id);
    } catch (err) {
        console.log('err', err);
        if (err.kind === 'not_found') {
            card = new Card({ customerID: req.customer.id });
            card = await Card.create(card);
        }
    }
    if (card !== null) {
        let listItem = await OrderDAO.getCartItemByCartID(card.id);
        card.listCartItem = listItem;
        res.send(card);
    } else {
        res.status(400).send(err);
    }
};

exports.addToCart = async (req, res) => {
    let cart = null;
    try {
        const customer = req.customer;
        cart = await OrderDAO.getCurrentCart(customer.id);
    } catch (err) {
        console.log('err', err);
        if (err.kind === 'not_found') {
            cart = new Card({ customerID: req.customer.id });
            cart = await OrderDAO.createCart(cart);
        }
    }
    if (cart !== null) {
        const cartItem = req.body;
        let cartExist = await OrderDAO.checkCartExist(cartItem);
        if (cartExist) {
            cartExist.quantity = cartExist.quantity + cartItem.quantity;
            console.log(cartExist);
            await OrderDAO.updateCartItem(cartExist);
        } else {
            await OrderDAO.createCartItem(req.body);
        }
        let listItem = await OrderDAO.getCartItemByCartID(cart.id);
        cart.listCartItem = listItem;
        console.log(cart);
        res.send(cart);
    }
};
exports.getAllPayment = async (req, res) => {
    try {
        let id = req.query.id
        console.log(id);
        let payments = await OrderDAO.getAllPayment(id);
        res.send(payments)
    }
    catch (err) {
        console.log(err, 'err')
        res.status(400).send(err)
    }
}

exports.getAllShipment = async (req, res) => {
    try {
        let shipments = await OrderDAO.getAllShipment();
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
        await OrderDAO.updateStatusCart(cartID)
        let newCart = new Card({ customerID: req.customer.id });
        newCart = await OrderDAO.createCart(newCart);
        let listItem = await OrderDAO.getCartItemByCartID(cartID);
        const listCartItemAddNewCart = _.differenceBy(listItem, listCartPaid, 'id')
        await Promise.all(listCartItemAddNewCart.map(item => {
            item.cartID = newCart.id
            return OrderDAO.updateCartItem(item)
        }))
        newCart.listCartItem = listItem
        await OrderDAO.createOrder({ cartID, paymentID, shipmentID, status: 'paid', dateCreat: new Date() })
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
        let result = await CustomerDAO.getAllOrderByCustomerId(customerID)
        const listCart = await Promise.all(result.map((item) => {
            return OrderDAO.getCartItemByCartID(item.cartID)
        }))
        result = result.map((item, index) => {
            const image = listCart[index]?.[0]?.bookItem?.image ?? ""
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