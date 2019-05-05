'use strict';

//global db connection variable
let {db, TABLES} = require('./db');

/**
 * Cart table DB setup
 *
 * Creates a table in the DB to store carts
 **/
exports.cartDbSetup = function(database) {
  db = database;
  console.log("Checking if cart table exists");
  return new Promise(function(resolve,reject) {
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
 * Get the content of a cart from its id (corresponding to user id)
 *
 * cartId Long 
 * returns Cart
 * 
 * TODO: check that fetching user is the proper one
 **/
exports.getCartById = function(cartId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.CART).where({id: cartId})
    .catch(error => {
      reject(error);
    })
    .then(function(cart) {
      if (Object.keys(cart).length > 0) {
        resolve(cart);
      } else {
        //no cart found
        resolve();
      }
    });
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

