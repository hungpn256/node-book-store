const sql = require("../db/index");
function Account(account) {
    this.customerID = account.customerID
    this.username = account.username;
    this.password = account.password;
}
Account.create = (account) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO Account (customerID,username,password) VALUES (?,?,?)", [account.customerID, account.username, account.password], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err, null);
                return;
            }

            console.log("created customer: ", { ...account, id: res.insertId });
            resolve(null, { ...account, id: res.insertId });
        });
    })

};
Account.findByUserNamePassword = (account) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM Account WHERE username = ? AND password = ?", [account.username, account.password], (err, res) => {
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
module.exports = Account;