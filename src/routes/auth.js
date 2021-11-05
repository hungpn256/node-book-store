var express = require('express');
var router = express.Router();
const customer = require('../controllers/customer')
/* GET users listing. */
/*customer*/  	//INSERT INTO customer(Mobile,Email) VALUES (?, ?);
/*account*/   //	INSERT INTO account(customerID,Username,Password) VALUES (?,?,?);
/*fullname*/ //	INSERT INTO fullname(customerID,Firstname,Midname,Lastname) VALUES (?,?,?,?);
/*address*/	//INSERT INTO address(customerID,Number,Street,District,City) VALUES (?,?,?,?,?);
router.post('/register', customer.create);
router.post('/login', customer.login);

module.exports = router;
