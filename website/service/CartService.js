'use strict';

//global db connection variable
let {db, TABLES} = require('./db');
//const upsert = require('knex-upsert')


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
 * Create a cart from the user id
 *
 * userId Long 
 * 
 * TODO: check that fetching user is the proper one
 **/
exports.createCartForUser = function(userId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.CART).insert({id: userId})
    .catch(error => {
      reject(error);
    })
    .then(() => {
      console.log("created cart for user");
      resolve();
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

/**
 * Add a book to the cart of a user
 * Update  - this can only be done by the logged in USER (proprietary of the cart or by an ADMIN).
 *
 * cartId Long id of the cart that needs to be updated
 * bookId Id of the book to be added
 * amount Long amount of books to add
 * no response value expected for this operation
 * 
 * TODO: check user authentication. Or in the controller?
 **/
exports.addBookToCart = function(cartId,bookId,amount) {
  return new Promise(function(resolve, reject) {
    db.from(TABLES.BOOK).select('stock').where('id', bookId)
    .then(book => {
      let availability = book[0].stock;
      //if book availability is <= 0, don't bother.
      if (availability < amount && availability > 0) {
        //order as much as possible!
        amount = availability;
        //TODO: reject or resolve with 404? or continue? continuing.
        //reject();
      }
    })
    .then(() => {
      Promise.all([
        db.raw(`INSERT INTO ${TABLES.BOOK_CART} (id_book, id_cart, amount) VALUES (${bookId},${cartId},${amount}) ON CONFLICT (id_book, id_cart) DO UPDATE SET amount = ${TABLES.BOOK_CART}.amount + ${amount} WHERE (${TABLES.BOOK_CART}.id_book, ${TABLES.BOOK_CART}.id_cart) = (${bookId},${cartId});`),
        db(TABLES.BOOK).where({ id: bookId }).decrement({ stock: amount })
      ]).then(() => {  
        //operation was successful:
        resolve({"message":"Operation completed."});
      })
    })
  });
}


/**
 * Remove a book from the cart of a user
 * Update  - this can only be done by the logged in USER (proprietary of the cart or by an ADMIN).
 *
 * cartId Long id of the cart that needs to be updated
 * bookId Id of the book to be removed
 * no response value expected for this operation
 * 
 * TODO: check user authentication. Or in the controller?
 * TODO: Reject/handle errors
 **/
exports.removeBookFromCart = function(cartId,bookId) {
  return new Promise(function(resolve, reject) {
    //remove book from cart, getting the amount
    db(TABLES.BOOK_CART).where({ id_book: bookId, id_cart: cartId}).del().returning('amount')
      .then(amount => {
        console.log("retrieved amount:");
        console.log(amount);
        //restore book amount into stock
        db(TABLES.BOOK).where({ id: bookId }).increment({ stock: amount })
        .then(() => {
          resolve();
        })
      })
  });
}
