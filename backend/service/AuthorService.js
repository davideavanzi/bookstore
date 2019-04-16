'use strict';

//global db connection variable
let sqlDb;

/**
 * Author table DB setup
 *
 * Creates a table in the DB to store authors
 **/
exports.authorDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if author table exists");
  return new Promise(resolve => {
    database.schema.hasTable("author").then(exists => {
      if (!exists) { 
        console.log("Author table not found. Creating...");
        database.schema.createTable("auhtor", table => {
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

