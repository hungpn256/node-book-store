const sql = require("../db/index");
class CustomerDAO {
    createAccount = (account) => {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO Account (customerID,username,password) VALUES (?,?,?)", [account.customerID, account.username, account.password], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err, null);
                }

                console.log("created customer: ", { ...account, id: res.insertId });
                resolve({ ...account, id: res.insertId });
            });
        })

    };
    findByUserNamePassword = (account) => {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM Account WHERE username = ? AND password = ?", [account.username, account.password], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                if (res.length) {
                    console.log("found customer: ", res[0]);
                    resolve(res[0]);
                }
                reject({ kind: "not_found" });
            });
        })

    };
    findAccountByID = (id) => {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM Account WHERE id = ?", [id], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                }
                if (res.length) {
                    console.log("found customer: ", res[0]);
                    resolve(res[0]);
                }
                reject({ kind: "not_found" });
            });
        })

    };
    createFullName = (fullName) => {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO Fullname (customerID,firstName,midName,lastName) VALUES (?,?,?,?)", [fullName.customerID, fullName.firstName, fullName.midName, fullName.lastName], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                    return;
                }

                console.log("created customer: ", res.insertId, { ...fullName, id: res.insertId, });
                resolve({ ...fullName, id: res.insertId });
            });
        })

    };
    findFullNameByCustomerID = (id) => {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM Fullname WHERE Fullname.customerID = ?", [id], (err, res) => {
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
    createCustomer = (newCustomer) => {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO Customer (mobile,email) VALUES (?, ?)", [newCustomer.mobile, newCustomer.email], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                    return;
                }
                console.log("created customer: ", { ...newCustomer, id: res.insertId, });
                resolve({ ...newCustomer, id: res.insertId });
            });
        })

    };
    findCustomerByCustomerID = (id) => {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM Customer WHERE id = ?", [id], (err, res) => {
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
    createAddress = (address) => {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO Address (customerID,number,street,district,city) VALUES (?,?,?,?,?)", [address.customerID, address.number, address.street, address.district, address.city], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err, null);
                    return;
                }
                console.log("created address: ", { id: res.insertId, ...address });
                resolve({ id: res.insertId, ...address });
            });
        })

    };
    findAddressByCustomerID = (id) => {
        return new Promise((resolve, reject) => {
            sql.query("SELECT * FROM Address WHERE Address.customerID = ?", [id], (err, res) => {
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
module.exports = new CustomerDAO()