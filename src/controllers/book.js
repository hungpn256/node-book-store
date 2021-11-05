const BookItem = require('../models/BookItem.js')
exports.getAll = (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }
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