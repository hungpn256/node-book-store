var Card = require('../models/cart');
const CartItem = require('../models/cartItem');
exports.getCurrentCard = async (req, res) => {
    let card = null;
    try {
        const customer = req.customer;
        card = await Card.getCurrentCart(customer.id)
    }
    catch (err) {
        console.log('err', err);
        if (err.kind === 'not_found') {
            card = new Card({ customerID: req.customer.id })
            card = await Card.create(card)
        }
    }
    if (card !== null) {
        let listItem = await CartItem.getCardItemByCardID(card.id);
        card.listCartItem = listItem;
        res.send(card)
    }
    else { res.status(400).send(err) }
};

exports.addToCart = async (req, res) => {
    let card = null;
    try {
        const customer = req.customer;
        card = await Card.getCurrentCart(customer.id)
    }
    catch (err) {
        console.log('err', err);
        if (err.kind === 'not_found') {
            card = new Card({ customerID: req.customer.id })
            card = await Card.create(card)
        }
    }
    if (card !== null) {
        let listItem = await CartItem.getCardItemByCardID(card.id);
        await CartItem.create(req.body)
        let listItem = await CartItem.getCardItemByCardID(card.id);
        card.listCartItem = listItem;
        res.send(card)
    }
}