const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js')

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, keys.jwt.secret);
        req.user = user;
    } else {
        return res.status(401).json({ message: 'Authorization required' })
    }
    next();
};