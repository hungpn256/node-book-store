const sql = require("../db/index");
const CartItem = function (cartItem) {
    this.id = cartItem.id
    this.cardID = cartItem.cardID
    this.quantity = cartItem.quantity;
    this.bookItemID = cartItem.bookItemID;
}
CartItem.create = (cartItem) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO CartItem (cartID,quantity,bookItemID) VALUES (?,?,?)", [cartItem.cardID, cartItem.quantity, cartItem.bookItemID], (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err, null);
                return;
            }

            console.log("created customer: ", { ...account, id: res.insertId });
            resolve({ ...cartItem, id: res.insertId });
        });
    })
}
module.exports = CartItem;