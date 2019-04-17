'use strict';

//global db connection variable
let sqlDb;

/**
 * user table DB setup
 *
 * Creates a table in the DB to store user
 **/
exports.userDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if user table exists");
  return new Promise(function(resolve,reject) {
    database.schema.hasTable("user").then(exists => {
      if (!exists) { 
        console.log("User table not found. Creating...");
        database.schema.createTable("user", table => {
          table.increments(); //id
          table.string("name");
          table.string("email");
          table.string("phone");
          table.string("address");
          table.string("password");
        }).then(exists => {
          console.log("user table created");
          resolve(exists);
        }).catch(error => {
          console.error(error); 
          reject(error);
        }); 
      } else {
        console.log("user table already present");
        resolve(exists);
      } 
    }).catch(error => {
      console.error(error); 
      reject(error);
    });
  });
};

/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * userId Long The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(userId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get user by user id
 *
 * userId Long The id of the user that needs to be fetched.
 * returns User
 **/
exports.getUserById = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "password" : "password",
  "role" : "USER",
  "phone" : "phone",
  "id" : 0,
  "email" : "email"
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
    console.log("New user registration received:");
    console.log(body);
    console.log(body.firstName+" "+body.lastName+" "+body.password+" "+body.email+" "+body.phone);
    //check on data, hash password, insert in database, email confirmation?
    resolve();
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * userId Long id of the user that need to be updated
 * body User Updated user object
 * no response value expected for this operation
 **/
exports.updateUser = function(userId,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

