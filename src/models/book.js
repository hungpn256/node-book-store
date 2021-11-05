const sql = require("../db/index");
function Book(book) {
    this.barcode = book.barcode
    this.title = book.title;
    this.summary = book.summary;
    this.pages = book.pages;
    this.languge = book.languge;
}