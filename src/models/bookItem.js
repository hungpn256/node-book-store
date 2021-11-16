const sql = require("../db/index");
function BookItem(bookItem) {
    this.id = bookItem.id;
    this.image = bookItem.image
    this.price = bookItem.price;
    this.discount = bookItem.discount;
    this.bookId = bookItem.bookId;
}
module.exports = BookItem