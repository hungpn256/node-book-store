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
}
module.exports = new BookDAO()