const BookDAO = require('../dao/BookDAO.js');
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

exports.create = async (req, res) => {
    try {
        const bookItem = req.body
        console.log('bookItem', bookItem)
        const author = await BookDAO.createAuthor(bookItem.book.author)
        const publisher = await BookDAO.createPublisher(bookItem.book.publisher)

        bookItem.book.authorId = author.id
        bookItem.book.publisherId = publisher.id

        const book = await BookDAO.createBook(bookItem.book)
        bookItem.bookId = book.id

        const bookItemRes = await BookDAO.createBookItem(bookItem);
        res.send(bookItemRes)
    }
    catch (err) {
        console.log('err', err);
        res.status(400).send(err)
    }
};