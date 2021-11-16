class Account {
    customerID;
    username;
    password;
    constructor(account) {
        this.id = account.id;
        this.customerID = account.customerID
        this.username = account.username;
        this.password = account.password;
    }
}
module.exports = Account;