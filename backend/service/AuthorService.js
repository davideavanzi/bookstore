'use strict';


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
    var examples = {};
    examples['application/json'] = {
  "name" : "name",
  "id" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * All authors, optionally filtered
 * List of authors
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20, max is 500. (optional)
 * authorId Long Id of the author to filter books (optional)
 * returns List
 **/
exports.getAuthors = function(offset,limit,authorId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "name",
  "id" : 6
}, {
  "name" : "name",
  "id" : 6
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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

