var express = require('express');
var router = express.Router();
const book = require('../controllers/book')

router.get('/book-item/:id', book.getItemById);
router.get('/book-item', book.getAll);
router.post('/book-item', book.create);

module.exports = router;
