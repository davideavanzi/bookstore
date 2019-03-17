'use strict';

let sqlDb;

/*
 * Setup DB table for books, if not exists
 */
exports.booksDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if books table exists");
  return database.schema.hasTable("books").then(exists => {
    if (!exists) {
      console.log("no books table found, creating...");
      return database.schema.createTable("books", table => {
        table.increments();
        table.text("title");
        table.int("authorID");
        table.text("photoUrl");
        table.float("value");
        table.text("currency");
        table.int("stock");
      });
    }
  });
};

/*
 * Find book by ID
 * Returns a book
 *
 * bookId Long ID of the book to retrieve
 * returns Book
 **/
exports.getBookById = function(bookId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "photoUrl" : "photoUrl",
  "author" : [ {
    "books" : [ null, null ],
    "name" : "name",
    "id" : 1
  }, {
    "books" : [ null, null ],
    "name" : "name",
    "id" : 1
  } ],
  "name" : "name",
  "genre" : [ {
    "name" : "name",
    "id" : 6
  }, {
    "name" : "name",
    "id" : 6
  } ],
  "id" : 0,
  "abstract" : "abstract"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * All books
 * List of books inserted books
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20, max is 500. (optional)
 * returns List
 **/
exports.getBooks = function(offset,limit) {
  return sqlDb('books')
    .limit(limit)
    .offset(offset)
}