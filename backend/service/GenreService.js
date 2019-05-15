'use strict';

//global db connection variable
let {db, TABLES} = require('./db');


/**
 * Add a new genre
 * Insert a new genre in the system - this can only be done by logged ADMIN.
 *
 * body Genre The name object that needs to be added
 * no response value expected for this operation
 **/
exports.addGenre = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a specific genre
 * Delete a genre - this can only be done by the logged in ADMIN.
 *
 * genreId Long The id of the theme that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteGenre = function(genreId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find genre by ID
 * Insert get a single genre in the system
 *
 * genreId Long ID of the genre to retrieve
 * returns Genre
 **/
exports.getGenreById = function(genreId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.GENRE).where({id: genreId})
    .catch(error => {
      reject(error);
    })
    .then(function(genre) {
      if (Object.keys(genre).length > 0) {
        resolve(genre);
      } else {
        resolve();
      }
    });  
  });
}


/**
 * All genres, optionally filtered
 * List of genres
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20, max is 500. (optional)
 * returns List
 **/
exports.getGenres = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    db(TABLES.GENRE).limit(limit).offset(offset)
    .catch(error => {
      reject(error);
    })
    .then(function (genres) {
      if (Object.keys(genres).length > 0) {
        resolve(genres);
      } else {
        //no events found
        resolve();
      }
    }); 
  });
}


/**
 * Update a specific genre
 * Update values of a genre - this can only be done by the logged in ADMIN.
 *
 * genreId Long id of the genre that needs to be updated
 * no response value expected for this operation
 **/
exports.updateGenre = function(genreId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

