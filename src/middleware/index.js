const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js')

exports.requireSignin = (req, res, next) => {
    console.log('req', req)
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const account = jwt.verify(token, keys.jwt.secret);
        req.customer = {};
        req.customer.account = account;
    } else {
        return res.status(401).json({ message: 'Authorization required' })
    }
    next();
};