const sql = require("../db/index");
function BookItem(bookItem) {
    this.image = bookItem.image
    this.price = bookItem.price;
    this.discount = bookItem.discount;
}


module.exports = BookItem