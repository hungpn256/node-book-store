const BookDAO = require('../dao/BookDAO.js');
const BookItem = require('../models/bookItem.js');
const { search } = require('../routes/book.js');
exports.getAll = async (req, res) => {
    const key = req.query.key || '';
    try {
        // Validate request
        const data = await BookDAO.getAll(key);
        res.send(data)
    }
    catch (err) {
        console.log('err', err);
        res.status(400).send(err)
    }

};
exports.getItemById = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const data = await BookDAO.getById(id)
        res.send(data)
    }
    catch (err) {
        console.log('err', err);
        res.status(400).send(err)
    }
};