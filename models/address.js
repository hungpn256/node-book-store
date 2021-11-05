const sql = require("../db/index");
function Address(address) {
    this.number = address.number;
    this.street = address.street;
    this.district = address.district;
    this.city = address.city;
    this.customerID = address.customerID;
}
Address.create = (address, result) => {
    sql.query("INSERT INTO Address (CustumerID,Number,Street,District,City) VALUES (?,?,?,?,?)", [address.customerID, address.number, address.street, address.district, address.city], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created address: ", { id: res.insertId, ...address });
        result(null, { id: res.insertId, ...address });
    });
};
module.exports = Address;