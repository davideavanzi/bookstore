'use strict';

//global db connection variable
let sqlDb;

/**
 * Books table DB setup
 *
 * Creates a table in the DB to store books
 **/
exports.booksDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if books table exists");
  return new Promise(resolve => {
    database.schema.hasTable("books").then(exists => {
      if (!exists) { 
        console.log("Books table not found. Creating...");
        database.schema.createTable("books", table => {
          table.increments(); //id
          table.text("title");
          table.text("photoUrl");
          table.float("value");
          table.text("currency");
          table.text("abstract");
          table.integer("stock");
        }).then(exists => {
          console.log("Books table created");
          resolve(exists);
        }); 
      } else {
        console.log("Books table already present");
        resolve(exists);
      } 
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
    var examples = {};
    examples['application/json'] = {
  "photoUrl" : "photoUrl",
  "price" : {
    "currency" : "EUR",
    "value" : 65.7
  },
  "author" : [ {
    "name" : "name",
    "id" : 6
  }, {
    "name" : "name",
    "id" : 6
  } ],
  "name" : "name",
  "genre" : [ "genre", "genre" ],
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
    var examples = {};
    examples['application/json'] = [ {
  "photoUrl" : "photoUrl",
  "price" : {
    "currency" : "EUR",
    "value" : 65.7
  },
  "author" : [ {
    "name" : "name",
    "id" : 6
  }, {
    "name" : "name",
    "id" : 6
  } ],
  "name" : "name",
  "genre" : [ "genre", "genre" ],
  "id" : 0,
  "abstract" : "abstract"
}, {
  "photoUrl" : "photoUrl",
  "price" : {
    "currency" : "EUR",
    "value" : 65.7
  },
  "author" : [ {
    "name" : "name",
    "id" : 6
  }, {
    "name" : "name",
    "id" : 6
  } ],
  "name" : "name",
  "genre" : [ "genre", "genre" ],
  "id" : 0,
  "abstract" : "abstract"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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

