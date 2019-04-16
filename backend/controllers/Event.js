'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.addEvent = function addEvent (req, res, next) {
  var body = req.swagger.params['body'].value;
  Event.addEvent(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteEvent = function deleteEvent (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Event.deleteEvent(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventById = function getEventById (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Event.getEventById(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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
      utils.writeJson(res, response);
    });
};

module.exports.updateEvent = function updateEvent (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  var body = req.swagger.params['body'].value;
  Event.updateEvent(eventId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
