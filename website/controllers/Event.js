'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.getEventById = function getEventById (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Event.getEventById(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
};

module.exports.getEvents = function getEvents (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var bookId = req.swagger.params['bookId'].value;
  Event.getEvents(offset,limit,bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
};