const sql = require("../db/index");
function Address(address) {
    this.number = address.number;
    this.street = address.street;
    this.district = address.district;
    this.city = address.city;
    this.customerID = address.customerID;
}
Address.create = (address, result) => {
    sql.query("INSERT INTO Address (customerID,number,street,district,city) VALUES (?,?,?,?,?)", [address.customerID, address.number, address.street, address.district, address.city], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created address: ", { id: res.insertId, ...address });
        result(null, { id: res.insertId, ...address });
    });
};
Address.findByCustomerID = (id, result) => {
    sql.query("SELECT * FROM Address WHERE Address.customerID = ?", [id], (err, res) => {
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
module.exports = Address;