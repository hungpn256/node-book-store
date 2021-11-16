function Shipment(shipment) {
    this.id = shipment.id;
    this.supplier = shipment.supplier;
    this.type = shipment.type;
    this.address = shipment.address;
    this.price = shipment.price;
}

module.exports = Shipment;