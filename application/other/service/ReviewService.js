'use strict';

//global db connection variable
let {db, TABLES} = require('./db');
let User = require('./UserService');

//xss sanitizer
var xss = require("xss");


/**
 * Add a new review
 * Insert a new review in the system - this can only be done by logged users.
 *
 * body Review The review object that needs to be added
 * no response value expected for this operation
 **/
exports.addReview = function(body) {
  return new Promise(function(resolve, reject) {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let current_datetime = new Date()
    let formatted_date = months[current_datetime.getMonth()] + " " + current_datetime.getDate() + ", " + current_datetime.getFullYear();
    let response = {};
    db(TABLES.REVIEW).insert({
      id_user: body.id_user, 
      id_book: body.id_book, 
      title: xss(body.title), 
      content: xss(body.content), 
      star: xss(body.star),
      date: xss(formatted_date)
    }).then(() => {
      resolve(response);
    });
  });reject();
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
        reject("404");
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

    //db.select(`${TABLES.REVIEW}.*`,`${TABLES.USER}.name`,`${TABLES.REVIEW}.id as id`)
    //.leftJoin(TABLES.USER, `${TABLES.REVIEW}.id_user`, `${TABLES.USER}.id`)
    //limit(limit).offset(offset)
    db(TABLES.REVIEW).limit(limit).offset(offset)
    .modify(function(queryBuilder) {
      if (bookId) {
        queryBuilder.where({'review.id_book': bookId});
      }
    })
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
        let fetched = reviews.map(function (review) {
          return new Promise(function(resolve, reject) {
            var user = User.getUserById(review.id_user);
            user.then(result => {
              review.username = result[0].firstName;
              resolve(review);
            });  
          }); 
        });
        Promise.all(fetched).then((reviewList) => {
          console.log(reviewList);
          resolve(reviewList);
        });
      } else {
        reject("404");
      }
    }); 
  });
}