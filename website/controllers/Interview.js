'use strict';

var utils = require('../utils/writer.js');
var Interview = require('../service/InterviewService');

module.exports.addInterview = function addInterview (req, res, next) {
  var body = req.swagger.params['body'].value;
  Interview.addInterview(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteInterview = function deleteInterview (req, res, next) {
  var interviewId = req.swagger.params['interviewId'].value;
  Interview.deleteInterview(interviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getInterviewById = function getInterviewById (req, res, next) {
  var interviewId = req.swagger.params['interviewId'].value;
  Interview.getInterviewById(interviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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
      utils.writeJson(res, response);
    });
};

module.exports.updateInterview = function updateInterview (req, res, next) {
  var interviewId = req.swagger.params['interviewId'].value;
  Interview.updateInterview(interviewId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
