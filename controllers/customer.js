const Account = require("../models/account.js");
const Address = require("../models/address.js");
const Customer = require("../models/customer.js");
const Fullname = require("../models/fullName.js");
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const { secret, tokenLife } = keys.jwt;
// Create and Save a new Customer
exports.create = (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }
        console.log(req.body.email);
        // Create a Customer
        let customer = new Customer({
            email: req.body.email,
            mobile: req.body.mobile,
        });

        // Save Customer in the database
        Customer.create(customer, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Customer."
                });
            else {
                customer = data;
                console.log(customer, 'data');
                let account = new Account({ ...req.body.account, customerID: customer.id })
                console.log(account);
                Account.create(account, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the account."
                        });
                    else customer.account = data;
                })

                let address = new Address({ ...req.body.address, customerID: customer.id })
                console.log(address)
                Address.create(address, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the address."
                        });
                    else customer.address = data;
                })
                let fullName = new Fullname({ ...req.body.fullName, customerID: customer.id })
                console.log(fullName)
                Fullname.create(fullName, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the fullName."
                        });
                    else {
                        customer.fullName = data;
                        res.send(customer)
                    }
                })
                console.log('success');
            }
        });

    }
    catch (err) {
        console.log('err', err);
        res.send(err)
    }
};
exports.login = (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }
        let customer = {}
        let account = new Account({ username: req.body.username, password: req.body.password })
        Account.findByUserNamePassword(account, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Sai tên đăng nhập, mật khẩu"
                });
            else {
                account = data;
                console.log(data, 'data login');
                Customer.findByCustomerID(data.customerID, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Sai tên đăng nhập, mật khẩu"
                        });
                    else {
                        customer = data;
                        customer.account = account;
                        console.log(customer, 'customer login');
                    }
                })

                Fullname.findByCustomerID(data.customerID, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Sai tên đăng nhập, mật khẩu"
                        });
                    else {
                        customer.fullName = data;
                        console.log(customer, 'customer login');
                    }
                })
                Address.findByCustomerID(data.customerID, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Sai tên đăng nhập, mật khẩu"
                        });
                    else {
                        customer.address = data;

                        const payload = {
                            id: customer.id
                        };
                        console.log(payload, secret, tokenLife, 'customer login');
                        jwt.sign(payload, secret, { expiresIn: tokenLife }, (err, token) => {
                            res.status(200).json({
                                success: true,
                                token: `Bearer ${token}`,
                                customer: customer
                            })
                        })
                    }
                })

            }
        })
    }
    catch (err) {
        console.log('err', err);
        res.send(err)
    }

};