const Account = require("../models/account.js");
const Address = require("../models/address.js");
const Customer = require("../models/customer.js");
const Fullname = require("../models/fullName.js");
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const { secret, tokenLife } = keys.jwt;
// Create and Save a new Customer
exports.create = async (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        let customer = new Customer({
            email: req.body.email,
            mobile: req.body.mobile,
        });

        // Save Customer in the database
        customer = await Customer.create(customer)
        let account = new Account({ ...req.body.account, customerID: customer.id })
        account = await Account.create(account)
        customer.account = account;

        let address = new Address({ ...req.body.address, customerID: customer.id })
        console.log(address)
        address = await Address.create(address)
        customer.address = address

        let fullName = new Fullname({ ...req.body.fullName, customerID: customer.id })
        console.log(fullName)
        fullName = await Fullname.create(fullName)
        customer.fullName = fullName

        res.send(customer)
        console.log('success');
    }
    catch (err) {
        console.log('err', err);
        res.status(400).send(err)
    }
};
exports.login = async (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }
        let customer = {}
        let account = new Account({ username: req.body.username, password: req.body.password })
        account = await Account.findByUserNamePassword(account)
        customer = await Customer.findByCustomerID(account.customerID)

        let fullName = await Fullname.findByCustomerID(account.customerID)
        let address = await Address.findByCustomerID(account.customerID)
        customer.address = address;
        customer.fullName = fullName;
        customer.account = account;
        const payload = {
            id: account.id
        };
        jwt.sign(payload, secret, { expiresIn: tokenLife }, (err, token) => {
            res.status(200).json({
                success: true,
                token: `Bearer ${token}`,
                customer: customer
            })
        })

    }
    catch (err) {
        console.log('err', err);
        res.status(400).send(err)
    }

};
exports.getMe = async (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }
        let customer = {}

        let account = new Account({ username: req.body.username, password: req.body.password })
        account = await Account.findByID(req.customer.account.id)
        customer = await Customer.findByCustomerID(account.customerID)

        let fullName = await Fullname.findByCustomerID(account.customerID)
        let address = await Address.findByCustomerID(account.customerID)
        customer.address = address;
        customer.fullName = fullName;
        customer.account = account;
        const payload = {
            id: account.id
        };
        jwt.sign(payload, secret, { expiresIn: tokenLife }, (err, token) => {
            res.status(200).json({
                success: true,
                token: `Bearer ${token}`,
                customer: customer
            })
        })

    }
    catch (err) {
        console.log('err', err);
        res.status(400).send(err)
    }

};