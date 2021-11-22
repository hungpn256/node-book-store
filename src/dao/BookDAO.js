const sql = require("../db/index");
class BookDAO {
    getAll = (key) => {
        return new Promise((resolve, reject) => {
            sql.query("select item.*, b.barcode,b.title,b.summary,b.pages,b.language,b.publisherID,b.authorID,p.name"
                + " as publisherName, p.address, a.biography, a.name as authorName  "
                + " from BookItem item inner join Book b on item.bookID = b.id"
                + " left join Publisher p on b.publisherID = p.id left join Author a  on b.authorID = a.id"
                + " where b.title like ?", [`%${key}%` || '%%'], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        reject(err);
                        return;
                    }
                    if (res.length) {
                        const listBookItem = res.map((item, index) => ({
                            id: item.id,
                            image: item.image,
                            price: item.price,
                            discount: item.discount,
                            book: {
                                id: item.bookID,
                                barcode: item.barcode,
                                title: item.title,
                                summary: item.summary,
                                pages: item.pages,
                                language: item.language,
                                publisher: {
                                    id: item.publisherID,
                                    name: item.publisherName,
                                    address: item.address
                                },
                                author: {
                                    id: item.authorID,
                                    name: item.authorName,
                                    biography: item.biography
                                }
                            }
                        }))
                        console.log("found customer: ", listBookItem);
                        resolve(listBookItem);
                        return;
                    }
                    reject({ kind: "not_found" });
                });
        })
    };
    getById = (id) => {
        return new Promise((resolve, reject) => {
            sql.query("select item.*, b.barcode,b.title,b.summary,b.pages,b.language,b.publisherID,b.authorID,p.name"
                + " as publisherName, p.address, a.biography, a.name as authorName  "
                + " from BookItem item inner join Book b on item.bookID = b.id"
                + " left join Publisher p on b.publisherID = p.id left join Author a  on b.authorID = a.id where item.id = ?", [id], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        reject(err);
                        return;
                    } else {
                        if (res.length) {
                            const item = res[0];
                            resolve({
                                id: item.id,
                                image: item.image,
                                price: item.price,
                                discount: item.discount,
                                book: {
                                    id: item.bookID,
                                    barcode: item.barcode,
                                    title: item.title,
                                    summary: item.summary,
                                    pages: item.pages,
                                    language: item.language,
                                    publisher: {
                                        id: item.publisherID,
                                        name: item.publisherName,
                                        address: item.address
                                    },
                                    author: {
                                        id: item.authorID,
                                        name: item.authorName,
                                        biography: item.biography
                                    }
                                }
                            })
                            return;
                        }
                        reject({ kind: "not_found" });
                    }
                })
        })

    }
    createBookItem = (bookItem) => {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO `BookItem` (image,price,discount,bookID) VALUES (?, ?,?,?)", [bookItem.image, bookItem.price, bookItem.discount, bookItem.bookId], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                    return;
                }
                console.log("created bookItem: ", { ...bookItem, id: res.insertId, });
                resolve({ ...bookItem, id: res.insertId });
            });
        })
    }
    createAuthor = (author) => {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO `Author` (name,biography) VALUES (?, ?)", [author.name, author.biography], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                    return;
                }
                console.log("created author: ", { ...author, id: res.insertId, });
                resolve({ ...author, id: res.insertId });
            });
        })

    };
    createPublisher = (publisher) => {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO `Publisher` (name,address) VALUES (?, ?)", [publisher.name, publisher.address], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                    return;
                }
                console.log("created publisher: ", { ...publisher, id: res.insertId, });
                resolve({ ...publisher, id: res.insertId });
            });
        })
    };
    createBook = (book) => {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO `Book` (barcode,title,summary,pages,language,publisherId,authorID) VALUES (?, ?, ?, ?,?,?,?)", [book.barcode, book.title, book.summary, book.pages, book.language, book.publisherId, book.authorId], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    reject(err);
                    return;
                }
                console.log("created publisher: ", { ...book, id: res.insertId, });
                resolve({ ...book, id: res.insertId });
            });
        })

    };
}
module.exports = new BookDAO()