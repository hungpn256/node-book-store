const sql = require("../db/index");
const Customer = function (customer) {
    console.log("==", customer);
    this.id = customer.id
    this.mobile = customer.mobile;
    this.email = customer.email;
}
Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO Custumer (Mobile,Email) VALUES (?, ?)", [newCustomer.mobile, newCustomer.email], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { ...newCustomer, id: res.insertId, });
        result(null, { ...newCustomer, id: res.insertId });
    });
};
module.exports = Customer;