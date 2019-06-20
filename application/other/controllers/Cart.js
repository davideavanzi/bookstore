'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');
var User = require('./User');

module.exports.getCartById = function getCartById (req, res, next) {
  var cartId = req.session.userId;
  var session = req.session;

  User.alreadyLoggedIn(session).then(result => {
    if(result) {
      Cart.getCartById(cartId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
    } else {
      console.log("Operation on cart not authorized");
      let body = {}
      body.message = "user unauthorized for specified cart"
      utils.writeJson(res, body, 401);
    }
  }) 
};

module.exports.addBookToCart = function addBookToCart (req, res, next) {
  var cartId = req.session.userId;
  var bookId = req.swagger.params['bookId'].value;
  var amount = req.swagger.params['amount'].value;
  var session = req.session;

  User.alreadyLoggedIn(session).then(result => {
    if(result) {
      Cart.addBookToCart(cartId, bookId, amount)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response, 406);
      });
    } else {
      console.log("Operation on cart not authorized");
      let body = {}
      body.message = "user unauthorized for specified cart"
      utils.writeJson(res, body, 401);
    }
  }) 
};

module.exports.removeBookFromCart = function removeBookFromCart (req, res, next) {
  var cartId = req.session.userId;
  var bookId = req.swagger.params['bookId'].value;
  var session = req.session;

  User.alreadyLoggedIn(session).then(result => {
    if(result) {
      Cart.removeBookFromCart(cartId, bookId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        var responseCode = 500;
        if(response == "404") responseCode = 404;
        utils.writeJson(res, response, responseCode);
      });
    } else {
      console.log("Operation on cart not authorized");
      let body = {}
      body.message = "user unauthorized for specified cart"
      utils.writeJson(res, body, 401);
    }
  }) 
};