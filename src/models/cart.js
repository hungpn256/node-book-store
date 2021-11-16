const sql = require("../db/index");
const BookItem = require("./bookItem");

const Cart = function (cart) {
    this.id = cart.id;
    this.customerID = cart.customerID;
    this.status = cart.status;
    this.dateCreat = cart.dateCreat;
    this.listCartItem = cart.listCartItem || [];
}


module.exports = Cart