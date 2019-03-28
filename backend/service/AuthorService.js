'use strict';

//Global database connection variable
let sqlDb;

/**
 * Authors table DB setup
 *
 * Creates a table in the DB to store authors
 **/
exports.authorsDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if authors table exists");
  return new Promise(resolve => {
    
    database.schema.hasTable("authors").then(exists => {
      if (!exists) { 
        console.log("Authors table not found. Creating...");
        database.schema.createTable("authors", table => {
          table.increments();
          table.text("name");
          table.text("photoUrl");
          table.text("bio");
        }).then(exists => {
          console.log("Authors table created");
          resolve(exists);
        }); 
      } else {
        console.log("Authors table already present");
        resolve(exists);
      } 
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
  "name" : "ava",
  "id" : 0
}, {
  "name" : "fabr",
  "id" : 1
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

