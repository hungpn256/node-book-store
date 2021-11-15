const sql = require("../db/index");
const BookItem = require("./bookItem");

const Cart = function (cart) {
    this.id = cart.id;
    this.customerID = cart.customerID;
    this.listCartItem = cart.listCartItem || [];
}


module.exports = Cart