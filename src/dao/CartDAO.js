const sql = require("../db/index");
const BookDAO = require("./BookDAO");
class CartItemDAO {
    create = (cartItem) => {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO CartItem (cartID,quantity,bookItemID) VALUES (?,?,?)", [cartItem.cardID, cartItem.quantity, cartItem.bookItemID], async (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err, null);
                    return;
                }

                let bookItem = await BookDAO.getById(cartItem.bookItemID)
                cartItem.bookItem = bookItem;
                console.log("created cartItem: ", { ...cartItem, id: res.insertId })
                resolve({ ...cartItem, id: res.insertId });
            });
        })
    }

    getCardItemByCardID = (cardID) => {
        return new Promise((resolve, reject) => {
            sql.query("select * from CartItem where cartID = ?", [cardID], async (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err, null);
                    return;
                }
                if (res.length) {
                    let result = await Promise.all(res.map((item) => {
                        return BookDAO.getById(item.bookItemID)
                    }))
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
    checkCartExist = (cardItem) => {
        return new Promise((resolve, reject) => {
            sql.query("select * from CartItem where cartID = ? and bookItemID = ?", [cardItem.cardID, cardItem.bookItemID], async (err, res) => {
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

    update = (cartUpdate) => {
        return new Promise((resolve, reject) => {
            sql.query("UPDATE CartItem  as cart set cart.quantity  = ? , cart.cartID = ? where cart.id = ?", [cartUpdate.quantity, cartUpdate.cartID, cartUpdate.id], (err, res) => {
                if (err) {
                    reject(err, null);
                    return;
                }
                else {
                    console.log(res, 'update');
                    resolve('ok');
                }
            })
        })
    }
    createCart = (cart) => {
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

    getCurrentCart = (idCustomer) => {
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

    updateStatusCart = (cartID) => {
        return new Promise((resolve, reject) => {
            sql.query("UPDATE Cart  as c set c.status = ? where c.id = ?", ['paid', cartID], (err, res) => {
                if (err) {
                    reject(err, null);
                    return;
                }
                else {
                    console.log(res, 'update');
                    resolve('ok');
                }
            })
        })
    }

    getAllShipment = () => {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM Shipment", [], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                    return;
                }
                if (res.length) {
                    console.log("found shipment: ", res);
                    resolve(res);
                    return;
                }
                reject({ kind: "not_found" });
            });
        })
    };
    getAllPayment = (idShipment) => {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM Payment where shipmentID = ?", [idShipment], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                    return;
                }
                if (res.length) {
                    console.log("found payment: ", res);
                    resolve(res);
                    return;
                }
                reject({ kind: "not_found" });
            });
        })
    };
    createOrder = (order) => {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO `Order` (shipmentID,paymentID,cartID,dateCreat,status) VALUES (?, ?, ?, ?, ?)", [order.shipmentID, order.paymentID, order.cartID, new Date(), order.status], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                    return;
                }
                console.log("created order: ", { ...order, id: res.insertId, });
                resolve({ ...order, id: res.insertId });
            });
        })

    };
    getAllOrderByCustomerId = (customerID) => {
        return new Promise((resolve, reject) => {
            sql.query("SELECT o.* FROM `Order` o left join Cart c on o.cartID = c.id where c.customerID = ?", [customerID], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                    return;
                }
                resolve(res || []);
            });
        })

    };
}

module.exports = new CartItemDAO()