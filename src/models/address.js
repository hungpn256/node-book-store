const sql = require("../db/index");
function Address(address) {
    this.number = address.number;
    this.street = address.street;
    this.district = address.district;
    this.city = address.city;
    this.customerID = address.customerID;
}

module.exports = Address;