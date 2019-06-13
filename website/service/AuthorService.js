'use strict';

//global db connection variable
let {db, TABLES} = require('./db');

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
        reject(404);
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
    .catch(error => {
      reject(error);
    })
    .then(function(authors) {
      if (Object.keys(authors).length > 0) {
        resolve(authors);
      } else {
        reject(404);
      }
    });
  });
}

