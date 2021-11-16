function Address(address) {
    this.id = address.id;
    this.number = address.number;
    this.street = address.street;
    this.district = address.district;
    this.city = address.city;
    this.customerID = address.customerID;
}

module.exports = Address;