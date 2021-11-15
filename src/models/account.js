class Account {
    customerID;
    username;
    password;
    constructor(account) {
        this.customerID = account.customerID
        this.username = account.username;
        this.password = account.password;
    }
}
module.exports = Account;