'use strict';

//global db connection variable
let sqlDb;

/**
 * Book table DB setup
 *
 * Creates a table in the DB to store books
 **/
exports.bookDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if book table exists");
  return new Promise(resolve => {
    database.schema.hasTable("book").then(exists => {
      if (!exists) { 
        console.log("Book table not found. Creating...");
        database.schema.createTable("book", table => {
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
  } ],
  "name" : "name",
  "genre" : [ "genre" ],
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
  } ],
  "name" : "name",
  "genre" : [ "genre" ],
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
  } ],
  "name" : "name",
  "genre" : [ "genre" ],
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

