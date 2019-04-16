'use strict';

//global db connection variable
let sqlDb;

/**
 * Cart table DB setup
 *
 * Creates a table in the DB to store carts
 **/
exports.cartDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if cart table exists");
  return new Promise(resolve => {
    database.schema.hasTable("cart").then(exists => {
      if (!exists) { 
        console.log("Cart table not found. Creating...");
        database.schema.createTable("cart", table => {
          table.increments(); //id
          table.date("date"); //check if date tipe is wrong
          table.integer("user_id");
        }).then(exists => {
          console.log("Cart table created");
          resolve(exists);
        }).catch(error => {
          console.error(error); 
          reject(error);
        }); 
      } else {
        console.log("Cart table already present");
        resolve(exists);
      } 
    }).catch(error => {
      console.error(error); 
      reject(error);
    });
  });
};
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
    "price" : {
      "currency" : "EUR",
      "value" : 65.7
    },
    "author" : [ {
      "name" : "name",
      "id" : 6
    }, {
      "name" : "name",
      "id" : 6
    } ],
    "name" : "name",
    "genre" : [ "genre", "genre" ],
    "id" : 0,
    "abstract" : "abstract"
  }, {
    "photoUrl" : "photoUrl",
    "price" : {
      "currency" : "EUR",
      "value" : 65.7
    },
    "author" : [ {
      "name" : "name",
      "id" : 6
    }, {
      "name" : "name",
      "id" : 6
    } ],
    "name" : "name",
    "genre" : [ "genre", "genre" ],
    "id" : 0,
    "abstract" : "abstract"
  } ],
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an user's cart
 * Update  - this can only be done by the logged in USER (proprietary of the cart or by an ADMIN).
 *
 * cartId Long id of the cart that needs to be updated
 * body Cart Updated cart object
 * no response value expected for this operation
 **/
exports.updateCart = function(cartId,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

