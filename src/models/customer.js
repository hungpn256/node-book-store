const Customer = function (customer) {
    console.log("==", customer);
    this.id = customer.id
    this.mobile = customer.mobile;
    this.email = customer.email;
}

module.exports = Customer;