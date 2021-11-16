function Book(book) {
    this.id = book.id;
    this.barcode = book.barcode
    this.title = book.title;
    this.summary = book.summary;
    this.pages = book.pages;
    this.languge = book.languge;
    this.publisherId = book.publisherId
    this.authorId = book.authorId
}
module.exports = Book;