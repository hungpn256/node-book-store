const sql = require("../db/index");
const BookItem = require("./bookItem");

const Cart = function (cart) {
    this.id = cart.id;
    this.customerID = cart.customerID;
    this.listCartItem = cart.listCartItem || [];
}
Cart.create = (cart) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO Cart (customerID,status,dateCreat) VALUES (?,?,?)", [cart.customerID, "using", new Date()], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err, null);
                return;
            }

            console.log("created customer: ", { ...cart, id: res.insertId });
            resolve({ ...cart, id: res.insertId });
        });
    })
}

Cart.getCurrentCart = (idCustomer) => {
    return new Promise((resolve, reject) => {
        sql.query("select * from Cart where customerID = ? and status = 'using'", [idCustomer], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
                return;
            }
            if (res.length) {
                resolve({ ...res[res.length - 1], status: 'using', dateCreat: new Date() });
                return;
            }
            reject({ kind: "not_found" });
        });
    })
};

module.exports = Cart