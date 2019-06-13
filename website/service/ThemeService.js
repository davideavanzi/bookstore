'use strict';

//global db connection variable
let {db, TABLES} = require('./db');


/**
 * Find theme by ID
 * Insert get a single theme in the system
 *
 * themeId Long ID of the theme to retrieve
 * returns Theme
 **/
exports.getThemeById = function(themeId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.THEME).where({id: themeId})
    .catch(error => {
      reject(error);
    })
    .then(function(theme) {
      if (Object.keys(theme).length > 0) {
        resolve(theme);
      } else {
        reject("404");
      }
    });  
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
  console.log("service called");
  return new Promise(function(resolve, reject) {
    console.log("Getting themes");
    db(TABLES.THEME).limit(limit).offset(offset)
    .catch(error => {
      reject(error);
    })
    .then(function (themes) {
      if (Object.keys(themes).length > 0) {
        console.log(themes);
        resolve(themes);
      } else {
        //no themes found
        console.log("No themes found");
        reject("404");
      }
    }); 
  });
}
