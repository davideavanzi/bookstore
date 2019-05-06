'use strict';

//global db connection variable
let {db, TABLES} = require('./db');

/**
 * Review table DB setup
 *
 * Creates a table in the DB to store Review
 **/
exports.reviewDbSetup = function(database) {
  db = database;
  console.log("Checking if review table exists");
  return new Promise(function(resolve,reject) {
    database.schema.hasTable("review").then(exists => {
      if (!exists) { 
        console.log("review table not found. Creating...");
        database.schema.createTable("review", table => {
          table.increments(); //id
          table.integer("star");
          table.string("title");
          table.text("content");
          table.integer("id_user");
        }).then(exists => {
          console.log("review table created");
          resolve(exists);
        }).catch(error => {
          console.error(error); 
          reject(error);
        }); 
      } else {
        console.log("review table already present");
        resolve(exists);
      } 
    }).catch(error => {
      console.error(error); 
      reject(error);
    });
  });
};

/**
 * Add a new review
 * Insert a new review in the system - this can only be done by logged users.
 *
 * body Review The review object that needs to be added
 * no response value expected for this operation
 **/
exports.addReview = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a specific review
 * Delete a review - this can only be done by the logged in ADMIN or the user that made it.
 *
 * reviewId Long The id of the review that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteReview = function(reviewId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find review by ID
 * Returns a review
 *
 * reviewId Long ID of the review to retrieve
 * returns Review
 **/
exports.getReviewById = function(reviewId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.REVIEW).where({id: reviewId})
    .catch(error => {
      reject(error);
    })
    .then(function(review) {
      if (Object.keys(review).length > 0) {
        resolve(review);
      } else {
        resolve();
      }
    });  
  });
}


/**
 * All reviews, optionally filtered
 * List of reviews
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20, max is 500. (optional)
 * userId Integer Id of the user that made the review (optional)
 * bookId Integer Id of the book to get reviews (optional)
 * returns List
 **/
exports.getReviews = function(offset,limit,userId,bookId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.REVIEW).limit(limit).offset(offset)
    //TODO:
    .modify(function(queryBuilder) {
      if (bookId) {
        queryBuilder.where({'id_book': bookId});
      }
    })
    //TODO:
    .modify(function(queryBuilder) {
      if (userId) {
        queryBuilder.where({'id_user': userId});
      }
    })
    .catch(error => {
      reject(error);
    })
    .then(function (reviews) {
      if (Object.keys(reviews).length > 0) {
        resolve(reviews);
      } else {
        //no reviews found
        resolve();
      }
    }); 
  });
}


/**
 * Update a specific review
 * Update values of a review - this can only be done by the logged in ADMIN or the user that made it.
 *
 * reviewId Long id of the review that needs to be updated
 * body Review Updated review object
 * no response value expected for this operation
 **/
exports.updateReview = function(reviewId,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

