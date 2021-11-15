function Order(order) {
    this.shipmenID = order.shipmenID;
    this.paymentID = order.paymentID;
    this.cartID = order.cartID;
    this.status = order.status;
    this.dateCreat = order.dateCreat;
}
module.exports = Order;