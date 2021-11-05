const sql = require("../db/index");
function Account(account) {
    this.customerID = account.customerID
    this.username = account.username;
    this.password = account.password;
}
Account.create = (account, result) => {
    sql.query("INSERT INTO Account (customerID,username,password) VALUES (?,?,?)", [account.customerID, account.username, account.password], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { ...account, id: res.insertId });
        result(null, { ...account, id: res.insertId });
    });
};
Account.findByUserNamePassword = (account, result) => {
    sql.query("SELECT * FROM Account WHERE username = ? AND password = ?", [account.username, account.password], (err, res) => {
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
module.exports = Account;