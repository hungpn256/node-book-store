var express = require('express');
var router = express.Router();
const customer = require('../controllers/customer')
/* GET users listing. */
/*custumer*/  	//INSERT INTO custumer(Mobile,Email) VALUES (?, ?);
/*account*/   //	INSERT INTO account(CustumerID,Username,Password) VALUES (?,?,?);
/*fullname*/ //	INSERT INTO fullname(CustumerID,Firstname,Midname,Lastname) VALUES (?,?,?,?);
/*address*/	//INSERT INTO address(CustumerID,Number,Street,District,City) VALUES (?,?,?,?,?);
router.post('/register', customer.create);

module.exports = router;
