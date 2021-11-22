var express = require('express');
var router = express.Router();
const shoes = require('../controllers/shoes')

router.get('/shoes-item/:id', shoes.getItemById);
router.get('/shoes-item', shoes.getAll);

module.exports = router;
