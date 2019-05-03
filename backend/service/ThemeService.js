'use strict';

//global db connection variable
let {db} = require('./db');

/**
 * theme table DB setup
 *
 * Creates a table in the DB to store theme
 **/
exports.themeDbSetup = function(database) {
  db = database;
  console.log("Checking if theme table exists");
  return new Promise(function(resolve,reject) {
    database.schema.hasTable("theme").then(exists => {
      if (!exists) { 
        console.log("theme table not found. Creating...");
        database.schema.createTable("theme", table => {
          table.increments(); //id
          table.string("name");
        }).then(exists => {
          console.log("theme table created");
          resolve(exists);
        }).catch(error => {
          console.error(error); 
          reject(error);
        }); 
      } else {
        console.log("theme table already present");
        resolve(exists);
      } 
    }).catch(error => {
      console.error(error); 
      reject(error);
    });
  });
};


/**
 * Add a new theme
 * Insert a new theme in the system - this can only be done by logged users.
 *
 * body Theme The name object that needs to be added
 * no response value expected for this operation
 **/
exports.addTheme = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a specific theme
 * Delete a theme - this can only be done by the logged in ADMIN.
 *
 * themeId Long The id of the theme that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteTheme = function(themeId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find theme by ID
 * Insert get a single theme in the system
 *
 * themeId Long ID of the theme to retrieve
 * returns Theme
 **/
exports.getThemeById = function(themeId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "name" : "Theme"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * All themes, optionally filtered
 * List of thmes
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20, max is 500. (optional)
 * returns List
 **/
exports.getThemes = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "name" : "Theme"
}, {
  "id" : 0,
  "name" : "Theme"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a specific theme
 * Update values of a theme - this can only be done by the logged in ADMIN.
 *
 * themeId Long id of the theme that needs to be updated
 * no response value expected for this operation
 **/
exports.updateTheme = function(themeId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

