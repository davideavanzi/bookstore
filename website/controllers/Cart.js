'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');
var User = require('./User');
//TODO: remove useless userId

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
      utils.writeJson(res, response);
    });
    } else {
      console.log("Operation on cart not authorized");
      let body = {}
      body.message = "user unauthorized for specified cart"
      utils.writeJson(res, body, 403);
    }
  }) 
};

//TODO: Is this useless?
module.exports.updateCart = function updateCart (req, res, next) {
  var cartId = req.session.userId;
  var body = req.swagger.params['body'].value;
  var session = req.session;

  User.alreadyLoggedIn(session).then(result => {
    if(result) {
      Cart.updateCart(cartId,body)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
    } else {
      console.log("Operation on cart not authorized");
      let body = {}
      body.message = "user unauthorized for specified cart"
      utils.writeJson(res, body, 403);
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
      utils.writeJson(res, body, 403);
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
        utils.writeJson(res, response);
      });
    } else {
      console.log("Operation on cart not authorized");
      let body = {}
      body.message = "user unauthorized for specified cart"
      utils.writeJson(res, body, 403);
    }
  }) 
};