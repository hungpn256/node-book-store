
const CartItem = function (cartItem) {
    this.id = cartItem.id
    this.cartID = cartItem.cartID
    this.quantity = cartItem.quantity;
    this.bookItemID = cartItem.bookItemID;
}

module.exports = CartItem;