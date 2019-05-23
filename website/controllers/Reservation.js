'use strict';

var utils = require('../utils/writer.js');
var Reservation = require('../service/ReservationService');

module.exports.addReservation = function addReservation (req, res, next) {
  var body = req.swagger.params['body'].value;
  Reservation.addReservation(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteReservation = function deleteReservation (req, res, next) {
  var reservationId = req.swagger.params['reservationId'].value;
  Reservation.deleteReservation(reservationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getReservationById = function getReservationById (req, res, next) {
  var reservationId = req.swagger.params['reservationId'].value;
  Reservation.getReservationById(reservationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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
      utils.writeJson(res, response);
    });
};

module.exports.updateReservation = function updateReservation (req, res, next) {
  var reservationId = req.swagger.params['reservationId'].value;
  var reservationAmount = req.swagger.params['reservationAmount'].value;
  Reservation.updateReservation(reservationId,reservationAmount)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
