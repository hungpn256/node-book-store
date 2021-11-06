const BookItem = require('../models/bookItem.js')
exports.getAll = (req, res) => {
    try {
        // Validate request
        BookItem.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while get all book"
                });
            else {
                res.send(data)
            }
        })
    }
    catch (err) {
        console.log('err', err);
        res.send(err)
    }

};
exports.getItemById = (req, res) => {
    try {
        const id = parseInt(req.params.id)
        BookItem.getById(id, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while get all book"
                });
            else {
                res.send(data)
            }
        })
    }
    catch (err) {
        console.log('err', err);
        res.send(err)
    }

};