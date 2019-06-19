'use strict';

var utils = require('../utils/writer.js');
var Review = require('../service/ReviewService');
var User = require('./User');

module.exports.addReview = function addReview (req, res, next) {
  var body = req.swagger.params['body'].value;
  var session = req.session;
  let resBody = {}
  
  User.alreadyLoggedIn(session).then(result => {
    if(result) {
      body.id_user = session.userId;
      if (body.star > 5 || body.star < 1) {
        resBody.message = "invalid input";
        utils.writeJson(res, resBody, 405);
      }
      Review.addReview(body)
      .then(function (response) {
        response.message = "Review inserted";
        utils.writeJson(res, response, 200);
      })
      .catch(function (response) {
        var responseCode = 500;
        if(response == "404") responseCode = 404;
        utils.writeJson(res, response, responseCode);
      });
    } else {
      console.log("Operation on review insert not authorized");
      resBody.message = "User not logged in"
      utils.writeJson(res, body, 403);
    }
  }) 
};

module.exports.getReviewById = function getReviewById (req, res, next) {
  var reviewId = req.swagger.params['reviewId'].value;
  Review.getReviewById(reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
};

module.exports.getReviews = function getReviews (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var userId = req.swagger.params['userId'].value;
  var bookId = req.swagger.params['bookId'].value;
  Review.getReviews(offset,limit,userId,bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
};