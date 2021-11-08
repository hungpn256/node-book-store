const BookItem = require('../models/bookItem.js')
exports.getAll = async (req, res) => {
    try {
        // Validate request
        const res = await BookItem.getAll();
        res.send(res)
    }
    catch (err) {
        console.log('err', err);
        res.status(400).send(err)
    }

};
exports.getItemById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const data = await BookItem.getById(id)
        res.send(data)
    }
    catch (err) {
        console.log('err', err);
        res.status(400).send(err)
    }

};