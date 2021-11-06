const sql = require("../db/index");
const Customer = function (customer) {
    console.log("==", customer);
    this.id = customer.id
    this.mobile = customer.mobile;
    this.email = customer.email;
}
Customer.create = (newCustomer) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO Customer (mobile,email) VALUES (?, ?)", [newCustomer.mobile, newCustomer.email], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
                return;
            }
            console.log("created customer: ", { ...newCustomer, id: res.insertId, });
            resolve({ ...newCustomer, id: res.insertId });
        });
    })

};
Customer.findByCustomerID = (id) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM Customer WHERE id = ?", [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
                return;
            }
            if (res.length) {
                console.log("found customer: ", res[0]);
                resolve(res[0]);
                return;
            }
            reject({ kind: "not_found" });
        });
    })

};
module.exports = Customer;