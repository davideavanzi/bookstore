'use strict';

//global db connection variable
let {db, TABLES} = require('./db');


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
        reject("404");
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
        reject("404");
      }
    }); 
  });
}
