var express = require('express');
var router = express.Router();
const clothes = require('../controllers/clothes')

router.get('/clothes-item/:id', clothes.getItemById);
router.get('/clothes-item', clothes.getAll);

module.exports = router;
