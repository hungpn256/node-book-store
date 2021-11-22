var express = require('express');
var router = express.Router();
const electronic = require('../controllers/electronic')

router.get('/electronic-item/:id', electronic.getItemById);
router.get('/electronic-item', electronic.getAll);

module.exports = router;
