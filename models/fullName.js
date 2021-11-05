const sql = require("../db/index");
const Fullname = function (fullName) {
    console.log("fullName", fullName);
    this.customerID = fullName.customerID;
    this.firstName = fullName.firstName;
    this.midName = fullName.midName;
    this.lastName = fullName.lastName;
}
Fullname.create = (fullName, result) => {
    sql.query("INSERT INTO Fullname (CustumerID,Firstname,Midname,Lastname) VALUES (?,?,?,?)", [fullName.customerID, fullName.firstName, fullName.midName, fullName.lastName], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", res.insertId, { ...fullName, id: res.insertId, });
        result(null, { ...fullName, id: res.insertId });
    });
};
module.exports = Fullname;