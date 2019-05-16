'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.getCartById = function getCartById (req, res, next) {
  var cartId = req.swagger.params['cartId'].value;
  Cart.getCartById(cartId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateCart = function updateCart (req, res, next) {
  var cartId = req.swagger.params['cartId'].value;
  var body = req.swagger.params['body'].value;
  Cart.updateCart(cartId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addBookToCart = function addBookToCart (req, res, next) {
  var cartId = req.swagger.params['cartId'].value;
  var bookId = req.swagger.params['bookId'].value;
  var amount = req.swagger.params['amount'].value;
  Cart.addBookToCart(cartId, bookId, amount)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeBookFromCart = function removeBookFromCart (req, res, next) {
  var cartId = req.swagger.params['cartId'].value;
  var bookId = req.swagger.params['bookId'].value;
  Cart.removeBookFromCart(cartId, bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};