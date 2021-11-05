const sql = require("../db/index");
const Fullname = function (fullName) {
    console.log("fullName", fullName);
    this.customerID = fullName.customerID;
    this.firstName = fullName.firstName;
    this.midName = fullName.midName;
    this.lastName = fullName.lastName;
}
Fullname.create = (fullName, result) => {
    sql.query("INSERT INTO Fullname (customerID,firstName,midName,lastName) VALUES (?,?,?,?)", [fullName.customerID, fullName.firstName, fullName.midName, fullName.lastName], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", res.insertId, { ...fullName, id: res.insertId, });
        result(null, { ...fullName, id: res.insertId });
    });
};
Fullname.findByCustomerID = (id, result) => {
    sql.query("SELECT * FROM fullname WHERE fullname.customerID = ?", [id], (err, res) => {
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
module.exports = Fullname;