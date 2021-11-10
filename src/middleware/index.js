const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js')

exports.requireSignin = (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const customer = jwt.verify(token, keys.jwt.secret);
        if (customer) {
            req.customer = customer;
            console.log('req', req.customer)
            next();
        }
        else {
            return res.status(401).json({ message: 'Authorization required' })
        }
    } else {
        return res.status(401).json({ message: 'Authorization required' })
    }

};