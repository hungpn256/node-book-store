const sql = require("../db/index");
const BookItem = require("./bookItem");
const CartItem = function (cartItem) {
    this.id = cartItem.id
    this.cartID = cartItem.cartID
    this.quantity = cartItem.quantity;
    this.bookItemID = cartItem.bookItemID;
}
CartItem.create = (cartItem) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO CartItem (cartID,quantity,bookItemID) VALUES (?,?,?)", [cartItem.cardID, cartItem.quantity, cartItem.bookItemID], async (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err, null);
                return;
            }

            let bookItem = await BookItem.getById(cartItem.bookItemID)
            cartItem.bookItem = bookItem;
            console.log("created cartItem: ", { ...cartItem, id: res.insertId })
            resolve({ ...cartItem, id: res.insertId });
        });
    })
}

CartItem.getCardItemByCardID = (cardID) => {
    return new Promise((resolve, reject) => {
        sql.query("select * from CartItem where cartID = ?", [cardID], async (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err, null);
                return;
            }
            if (res.length) {
                let result = await Promise.all(res.map((item) => {
                    return BookItem.getById(item.bookItemID)
                }))
                console.log("result: ", result)
                res = res.map((item, i) => ({
                    ...item,
                    bookItem: result[i]
                }))
                resolve(res);
            }
            resolve([]);
        });
    })
}
CartItem.checkCartExist = (cardItem) => {
    return new Promise((resolve, reject) => {
        sql.query("select * from CartItem where cartID = ? and bookItemID = ?", [cardItem.cardID,cardItem.bookItemID], async (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err, null);
                return;
            }
            if (res.length) {
                console.log("result: ", res)
                resolve(res[0]);
            }
            resolve(null);
        });
    })
}

CartItem.update = (cartUpdate) => {
    return new Promise ((resolve,reject) => {sql.query("UPDATE CartItem  as cart set cart.quantity  = ? , cart.cartID = ? where cart.id = ?", [cartUpdate.quantity,cartUpdate.cartID,cartUpdate.id],(err,res) =>{
        if(err){
            reject(err,null);
            return;
        }
        else{
            console.log(res,'update');
            resolve('ok');
        }
    })})
}
module.exports = CartItem;