const sql = require("../db/index");
function Account(account) {
    this.customerID = account.customerID
    this.username = account.username;
    this.password = account.password;
}
Account.create = (account, result) => {
    sql.query("INSERT INTO Account (CustumerID,Username,Password) VALUES (?,?,?)", [account.customerID, account.username, account.password], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { ...account, id: res.insertId });
        result(null, { ...account, id: res.insertId });
    });
};
module.exports = Account;