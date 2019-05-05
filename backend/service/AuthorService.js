'use strict';

//global db connection variable
let {db, TABLES} = require('./db');

/**
 * Author table DB setup
 *
 * Creates a table in the DB to store authors
 **/
exports.authorDbSetup = function(database) {
  db = database;
  console.log("Checking if author table exists");
  return new Promise(function(resolve,reject) {
    database.schema.hasTable(TABLES.AUTHOR).then(exists => {
      if (!exists) { 
        console.log("Author table not found. Creating...");
        database.schema.createTable(TABLES.AUTHOR, table => {
          table.increments(); //id
          table.string("name");
          table.text("bio");
          table.string("photo");
        }).then(exists => {
          console.log("Auhtor table created");
          resolve(exists);
        }).catch(error => {
          console.error(error); 
          reject(error);
        }); 
      } else {
        console.log("Author table already present");
        resolve(exists);
      } 
    }).catch(error => {
      console.error(error); 
      reject(error);
    });
  });
};

/**
 * Add a new author
 * Insert new author in the system - this can only be done by the logged in ADMIN.
 *
 * body Author The author object that needs to be added to the bookstore
 * no response value expected for this operation
 **/
exports.addAuthor = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a specific author
 * Delete a author - this can only be done by the logged in ADMIN.
 *
 * authorId Long The id of the author that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteAuthor = function(authorId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find author by ID
 * Returns an author
 *
 * authorId Long ID of the author to retrieve
 * returns Author
 **/
exports.getAuthorById = function(authorId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.AUTRHOD).where({id: authorId})
    .catch(error => {
      reject(error);
    })
    .then(function(author) {
      if (Object.keys(author).length > 0) {
        resolve(author);
      } else {
        resolve();
      }
    });
  });
}


/**
 * All authors, optionally filtered
 * List of authors
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20, max is 500. (optional)
 * bookId Long Id of the book to filter authors (optional)
 * returns List
 **/
exports.getAuthors = function(offset,limit,bookId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.AUTHOR).limit(limit).offset(offset)
    .modify(function(queryBuilder) {
      if(authorId) {
        //TODO: FILTER BY BOOK
      }
    })
    .catch(error => {
      reject(error);
    })
    .then(function(authors) {
      if (Object.keys(authors).length > 0) {
        resolve(authors);
      } else {
        //No authors found
        resolve();
      }
    });
  });
}


/**
 * Update a specific author
 * Update values of an author - this can only be done by the logged in ADMIN.
 *
 * authorId Long id of the author that needs to be updated
 * body Author Updated author object
 * no response value expected for this operation
 **/
exports.updateAuthor = function(authorId,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

