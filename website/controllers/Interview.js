'use strict';

var utils = require('../utils/writer.js');
var Interview = require('../service/InterviewService');

module.exports.getInterviewById = function getInterviewById (req, res, next) {
  var interviewId = req.swagger.params['interviewId'].value;
  Interview.getInterviewById(interviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
};

module.exports.getInterviews = function getInterviews (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var bookId = req.swagger.params['bookId'].value;
  Interview.getInterviews(offset,limit,bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
};