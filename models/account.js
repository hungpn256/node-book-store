function Account(account) {
    this.username = account.username;
    this.password = account.password;
}
Account.create = (newCustomer, result) => {
    sql.query("INSERT INTO Customer SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...newCustomer });
        result(null, { id: res.insertId, ...newCustomer });
    });
};
module.exports = Account;