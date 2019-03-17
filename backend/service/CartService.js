'use strict';


/**
 * Get the content of a cart
 *
 * cartId Long 
 * returns Cart
 **/
exports.getCartById = function(cartId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "books" : [ {
    "photoUrl" : "photoUrl",
    "author" : [ {
      "books" : [ null, null ],
      "name" : "name",
      "id" : 1
    }, {
      "books" : [ null, null ],
      "name" : "name",
      "id" : 1
    } ],
    "name" : "name",
    "genre" : [ {
      "name" : "name",
      "id" : 6
    }, {
      "name" : "name",
      "id" : 6
    } ],
    "id" : 0,
    "abstract" : "abstract"
  }, {
    "photoUrl" : "photoUrl",
    "author" : [ {
      "books" : [ null, null ],
      "name" : "name",
      "id" : 1
    }, {
      "books" : [ null, null ],
      "name" : "name",
      "id" : 1
    } ],
    "name" : "name",
    "genre" : [ {
      "name" : "name",
      "id" : 6
    }, {
      "name" : "name",
      "id" : 6
    } ],
    "id" : 0,
    "abstract" : "abstract"
  } ],
  "user" : {
    "firstName" : "firstName",
    "lastName" : "lastName",
    "password" : "password",
    "userStatus" : 6,
    "phone" : "phone",
    "id" : 0,
    "email" : "email",
    "username" : "username"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

