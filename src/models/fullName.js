const sql = require("../db/index");
const Fullname = function (fullName) {
    console.log("fullName", fullName);
    this.customerID = fullName.customerID;
    this.firstName = fullName.firstName;
    this.midName = fullName.midName;
    this.lastName = fullName.lastName;
}
Fullname.create = (fullName) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO Fullname (customerID,firstName,midName,lastName) VALUES (?,?,?,?)", [fullName.customerID, fullName.firstName, fullName.midName, fullName.lastName], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
                return;
            }

            console.log("created customer: ", res.insertId, { ...fullName, id: res.insertId, });
            resolve({ ...fullName, id: res.insertId });
        });
    })

};
Fullname.findByCustomerID = (id) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM fullname WHERE fullname.customerID = ?", [id], (err, res) => {
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
module.exports = Fullname;