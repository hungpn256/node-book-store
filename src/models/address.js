const sql = require("../db/index");
function Address(address) {
    this.number = address.number;
    this.street = address.street;
    this.district = address.district;
    this.city = address.city;
    this.customerID = address.customerID;
}
Address.create = (address) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO Address (customerID,number,street,district,city) VALUES (?,?,?,?,?)", [address.customerID, address.number, address.street, address.district, address.city], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err, null);
                return;
            }
            console.log("created address: ", { id: res.insertId, ...address });
            resolve({ id: res.insertId, ...address });
        });
    })

};
Address.findByCustomerID = (id) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM Address WHERE Address.customerID = ?", [id], (err, res) => {
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
module.exports = Address;