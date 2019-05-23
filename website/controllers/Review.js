'use strict';

var utils = require('../utils/writer.js');
var Review = require('../service/ReviewService');

module.exports.addReview = function addReview (req, res, next) {
  var body = req.swagger.params['body'].value;
  Review.addReview(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteReview = function deleteReview (req, res, next) {
  var reviewId = req.swagger.params['reviewId'].value;
  Review.deleteReview(reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReviewById = function getReviewById (req, res, next) {
  var reviewId = req.swagger.params['reviewId'].value;
  Review.getReviewById(reviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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
      utils.writeJson(res, response);
    });
};

module.exports.updateReview = function updateReview (req, res, next) {
  var reviewId = req.swagger.params['reviewId'].value;
  var body = req.swagger.params['body'].value;
  Review.updateReview(reviewId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
