'use strict';

/*
 * Setup DB table for users, if not exists
 */
exports.usersDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if users table exists");
  return database.schema.hasTable("users").then(exists => {
    if (!exists) {
      console.log("no books table found, creating...");
      return database.schema.createTable("books", table => {
        table.increments();
        table.text("title");
        table.int("authorID");
        table.text("photoUrl");
        table.float("value");
        table.text("currency");
        table.int("stock");
      });
    }
  });
};


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(username) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get user by user name
 *
 * username String The name that needs to be fetched. Use user1 for testing.
 * returns User
 **/
exports.getUserByName = function(username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "password" : "password",
  "userStatus" : 6,
  "phone" : "phone",
  "id" : 0,
  "email" : "email",
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
 * Logs user into the system
 *
 * username String The user name for login
 * password String The password for login in clear text
 * no response value expected for this operation
 **/
exports.loginUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logs out current logged in user session
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Register a new user
 * This registers a new user in the store.
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.registerUser = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * username String name that need to be updated
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = function(username,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

