'use strict';

//global db connection variable
let {db, TABLES} = require('./db');


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
    db(TABLES.AUTHOR).where({id: authorId})
    .catch(error => {
      reject(error);
    })
    .then(function(author) {
      if (Object.keys(author).length > 0) {
        resolve(author[0]);
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
    db(TABLES.AUTHOR).limit(limit).offset(offset).orderBy("name")
    /*
    .modify(function(queryBuilder) {
      if(authorId) {
        //TODO: FILTER BY BOOK
      }
    })*/
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

