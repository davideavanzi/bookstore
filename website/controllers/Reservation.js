'use strict';

var utils = require('../utils/writer.js');
var Reservation = require('../service/ReservationService');

module.exports.getReservationById = function getReservationById (req, res, next) {
  var reservationId = req.swagger.params['reservationId'].value;
  Reservation.getReservationById(reservationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
};

module.exports.getReservations = function getReservations (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var userId = req.swagger.params['userId'].value;
  var bookId = req.swagger.params['bookId'].value;
  Reservation.getReservations(offset,limit,userId,bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
};