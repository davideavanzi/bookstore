'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');
var User = require('./User');

module.exports.getCartById = function getCartById (req, res, next) {
  var cartId = req.swagger.params['cartId'].value;
  var session = req.session;

  User.checkAuth(session, cartId).then(result => {
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
      //TODO: return user not authorized
    }
  }) 
};

//TODO: Is this useless?
module.exports.updateCart = function updateCart (req, res, next) {
  var cartId = req.swagger.params['cartId'].value;
  var body = req.swagger.params['body'].value;
  var session = req.session;

  User.checkAuth(session, cartId).then(result => {
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
      //TODO: return user not authorized
    }
  }) 
};

module.exports.addBookToCart = function addBookToCart (req, res, next) {
  var cartId = req.swagger.params['cartId'].value;
  var bookId = req.swagger.params['bookId'].value;
  var amount = req.swagger.params['amount'].value;
  var session = req.session;

  User.checkAuth(session, cartId).then(result => {
    if(result) {
      Cart.addBookToCart(cartId, bookId, amount)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
    } else {
      console.log("Operation on cart not authorized");
      //TODO: return user not authorized
    }
  }) 
};

module.exports.removeBookFromCart = function removeBookFromCart (req, res, next) {
  var cartId = req.swagger.params['cartId'].value;
  var bookId = req.swagger.params['bookId'].value;
  var session = req.session;

  User.checkAuth(session, cartId).then(result => {
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
      //TODO: return user not authorized
    }
  }) 
};