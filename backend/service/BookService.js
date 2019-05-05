'use strict';

//global db connection variable
let {db, TABLES} = require('./db');


/**
 * Book table DB setup
 *
 * Creates a table in the DB to store books
 **/
exports.bookDbSetup = function(database) {
  db = database;
  console.log("Checking if book table exists");
  return new Promise(function(resolve,reject) {
    database.schema.hasTable(TABLES.BOOK).then(exists => {
      if (!exists) { 
        console.log("Book table not found. Creating...");
        database.schema.createTable(TABLES.BOOK, table => {
          table.increments(); //id
          table.string("title");
          table.string("cover");
          table.text("abstract");
          table.text("fact_sheet");
          table.integer("genre_id");
          table.float("value");
          table.integer("stock");
        }).then(exists => {
          console.log("Book table created");
          resolve(exists);
        }).catch(error => {
          console.error(error); 
          reject(error);
        }); 
      } else {
        console.log("Book table already present");
        resolve(exists);
      } 
    }).catch(error => {
      console.error(error); 
      reject(error);
    });
  });
};


/**
 * Add a new book
 * Insert new book in the system - this can only be done by the logged in ADMIN.
 *
 * body Book The book object that needs to be added to the bookstore
 * no response value expected for this operation
 **/
exports.addBook = function(body) {
  return new Promise(function(resolve, reject) {
    console.log("book creation request:");
    console.log(body);
    resolve();
  });
}


/**
 * Delete a specific book
 * Delete a book - this can only be done by the logged in ADMIN.
 *
 * bookId Long The id of the book that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteBook = function(bookId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find book by ID
 * Returns a book
 *
 * bookId Long ID of the book to retrieve
 * returns Book
 **/
exports.getBookById = function(bookId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.BOOK).where({id: bookId})
    .catch(error => {
      reject(error);
    })
    .then(function(book){
      if (Object.keys(book).length > 0) {   
        resolve(book);
      } else {
        //No book found
        resolve();
      }
    });   
  });
}


/**
 * All books, optionally filtered
 * List of books inserted books
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20, max is 500. (optional)
 * authorId Long Id of the author to filter books (optional)
 * returns List
 **/
exports.getBooks = function(offset,limit,authorId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.BOOK).limit(limit).offset(offset)
    .modify(function(queryBuilder) {
      if(authorId) {
        //TODO: FILTER BY AUTHOR
      }
    })
    .catch(error => {
      reject(error);
    })
    .then(function(books) {
      if (Object.keys(books).length > 0) {
        resolve(books);
      } else {
        //No books found
        resolve();
      }
    });
  });
}

/**
 * Update a specific book
 * Update values of a book - this can only be done by the logged in ADMIN.
 *
 * bookId Long id of the book that needs to be updated
 * body Book Updated book object
 * no response value expected for this operation
 **/
exports.updateBook = function(bookId,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

