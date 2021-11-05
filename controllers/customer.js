const Account = require("../models/account.js");
const Address = require("../models/address.js");
const Customer = require("../models/customer.js");
const Fullname = require("../models/fullName.js");

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