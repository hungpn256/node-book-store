const sql = require("../db/index");
const Customer = function (customer) {
    console.log("==", customer);
    this.id = customer.id
    this.mobile = customer.mobile;
    this.email = customer.email;
}
Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO Customer (mobile,email) VALUES (?, ?)", [newCustomer.mobile, newCustomer.email], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { ...newCustomer, id: res.insertId, });
        result(null, { ...newCustomer, id: res.insertId });
    });
};
Customer.findByCustomerID = (id, result) => {
    sql.query("SELECT * FROM Customer WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found customer: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};
module.exports = Customer;