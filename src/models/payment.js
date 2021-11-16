function Payment(payment) {
    this.id = payment.id;
    this.shipmentId = payment.shipmentId;
    this.supplier = payment.supplier;
    this.type = payment.type;
}

module.exports = Payment;