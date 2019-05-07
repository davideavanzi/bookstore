/****************************************************
 * 
 * Auxiliary tables DB setup functions
 * 
 ****************************************************/

//global db connection variable
let {db, TABLES} = require('./db');


// attach category to post
exports.attachAuthorBook = (bookId, authorId) => {  
  return db.insert({ id_book: bookId, id_author: authorId }).into(TABLES.BOOK_AUTHOR);//.returning('*');
};



/**
 * book_author table DB setup
 *
 * Creates a table in the DB to store relations between authors and books
 **/
exports.book_authorDbSetup = function(database) {
  db = database;
  console.log("Checking if book_author table exists");
  return new Promise(resolve => {
    database.schema.hasTable("book_author").then(exists => {
      if (!exists) { 
        console.log("book_author table not found. Creating...");
        database.schema.createTable("book_author", table => {
          table.integer("id_book");
          table.integer("id_author");
        }).then(exists => {
          console.log("book_author table created");
          resolve(exists);
        }).catch(error => {
          console.error(error); 
          reject(error);
        }); 
      } else {
        console.log("book_author table already present");
        resolve(exists);
      } 
    }).catch(error => {
      console.error(error); 
      reject(error);
    });
  });
};


/**
 * theme_book table DB setup
 *
 * Creates a table in the DB to store relations between themes and books
 **/
exports.theme_bookDbSetup = function(database) {
  db = database;
  console.log("Checking if theme_book table exists");
  return new Promise(resolve => {
    database.schema.hasTable("theme_book").then(exists => {
      if (!exists) { 
        console.log("theme_book table not found. Creating...");
        database.schema.createTable("theme_book", table => {
          table.integer("id_book");
          table.integer("id_theme");
        }).then(exists => {
          console.log("theme_book table created");
          resolve(exists);
        }).catch(error => {
          console.error(error); 
          reject(error);
        }); 
      } else {
        console.log("theme_book table already present");
        resolve(exists);
      } 
    }).catch(error => {
      console.error(error); 
      reject(error);
    });
  });
};

/**
 * cart_book table DB setup
 *
 * Creates a table in the DB to store relations between carts and books
 **/
exports.cart_bookDbSetup = function(database) {
  db = database;
  console.log("Checking if cart_book table exists");
  return new Promise(function(resolve,reject) {
    database.schema.hasTable("cart_book").then(exists => {
      if (!exists) { 
        console.log("cart_book table not found. Creating...");
        database.schema.createTable("cart_book", table => {
          table.integer("id_book");
          table.integer("id_cart");
        }).then(exists => {
          console.log("cart_book table created");
          resolve(exists);
        }).catch(error => {
          console.error(error); 
          reject(error);
        }); 
      } else {
        console.log("cart_book table already present");
        resolve(exists);
      } 
    }).catch(error => {
      console.error(error); 
      reject(error);
    });
  });
};
