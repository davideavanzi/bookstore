'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.getCartById = function getCartById (req, res, next) {
  var cartId = req.swagger.params['cartId'].value;

  //check if user is authenticated
  if (!req.session || !req.session.loggedin) {
    utils.writeJson(res, { error: 'user not authorized' }, 404);
  } else {
    Cart.getCartById(cartId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
  }
};
