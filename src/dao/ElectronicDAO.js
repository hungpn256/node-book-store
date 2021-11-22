const sql = require("../db/index");
class ElectronicDAO {
    getAll = (key) => {
        return new Promise((resolve, reject) => {
            sql.query("select item.*, e.specifications,e.warranty,e.screenSize,e.des,e.name"
                + " from ElectronicsItem item inner join Electronics e on item.id = e.electronicsItemid"
                + " where e.name like ?", [`%${key}%` || '%%'], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        reject(err);
                        return;
                    }
                    if (res.length) {
                        const listElectronicItem = res.map((item, index) => ({
                            id: item.id,
                            image: item.image,
                            barcode: item.barcode,
                            price: item.price,
                            discount: item.discount,
                            electronic: {
                                specifications: item.specifications,
                                warranty: item.warranty,
                                screenSize: item.screenSize,
                                des: item.des,
                                name: item.name
                            }

                        }))
                        console.log("found customer: ", listElectronicItem);
                        resolve(listElectronicItem);
                        return;
                    }
                    reject({ kind: "not_found" });
                });
        })
    };
    // getById = (id) => {
    //     return new Promise((resolve, reject) => {
    //         sql.query("select item.*, e.barcode,e.title,e.summary,e.pages,e.language,e.publisherID,e.authorID,p.name"
    //             + " as publisherName, p.address, a.biography, a.name as authorName  "
    //             + " from BookItem item inner join Book b on item.bookID = e.id"
    //             + " left join Publisher p on e.publisherID = p.id left join Author a  on b.authorID = a.id where item.id = ?", [id], (err, res) => {
    //                 if (err) {
    //                     console.log("error: ", err);
    //                     reject(err);
    //                     return;
    //                 } else {
    //                     if (res.length) {
    //                         const item = res[0];
    //                         resolve({
    //                             id: item.id,
    //                             image: item.image,
    //                             price: item.price,
    //                             discount: item.discount,
    //                             book: {
    //                                 id: item.bookID,
    //                                 barcode: item.barcode,
    //                                 title: item.title,
    //                                 summary: item.summary,
    //                                 pages: item.pages,
    //                                 language: item.language,
    //                                 publisher: {
    //                                     id: item.publisherID,
    //                                     name: item.publisherName,
    //                                     address: item.address
    //                                 },
    //                                 author: {
    //                                     id: item.authorID,
    //                                     name: item.authorName,
    //                                     biography: item.biography
    //                                 }
    //                             }
    //                         })
    //                         return;
    //                     }
    //                     reject({ kind: "not_found" });
    //                 }
    //             })
    //     })

    // }
}
module.exports = new ElectronicDAO()