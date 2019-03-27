'use strict';


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
    var examples = {};
    examples['application/json'] = {
  "rate" : 5,
  "id" : 0,
  "text" : "text",
  "userId" : 6,
  "bookId" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
    var examples = {};
    examples['application/json'] = [ {
  "rate" : 5,
  "id" : 0,
  "text" : "text",
  "userId" : 6,
  "bookId" : 1
}, {
  "rate" : 5,
  "id" : 0,
  "text" : "text",
  "userId" : 6,
  "bookId" : 1
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
