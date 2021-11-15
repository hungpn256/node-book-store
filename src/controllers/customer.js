const Account = require("../models/account.js");
const Address = require("../models/address.js");
const Customer = require("../models/customer.js");
const Fullname = require("../models/fullName.js");
const CustomerDAO = require("../dao/CustomerDAO")
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const { secret, tokenLife } = keys.jwt;
exports.create = async (req, res) => {
    try {
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
        account = await CustomerDAO.createAccount(account)
        customer.account = account;

        let address = new Address({ ...req.body.address, customerID: customer.id })
        console.log(address)
        address = await CustomerDAO.createAddress(address)
        customer.address = address

        let fullName = new Fullname({ ...req.body.fullName, customerID: customer.id })
        console.log(fullName)
        fullName = await CustomerDAO.createFullName(fullName)
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
        account = await CustomerDAO.findByUserNamePassword(account)
        customer = await CustomerDAO.findCustomerByCustomerID(account.customerID)

        let fullName = await CustomerDAO.findFullNameByCustomerID(account.customerID)
        let address = await CustomerDAO.findAddressByCustomerID(account.customerID)
        customer.address = address;
        customer.fullName = fullName;
        customer.account = account;
        const payload = {
            id: customer.id,
            account: {
                id: account.id
            }
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
        console.log(req.customer.account.id, 'ád')
        const account = await CustomerDAO.findAccountByID(req.customer.account.id)
        customer = await CustomerDAO.findCustomerByCustomerID(account.customerID)

        let fullName = await CustomerDAO.findFullNameByCustomerID(account.customerID)
        let address = await CustomerDAO.findAddressByCustomerID(account.customerID)
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