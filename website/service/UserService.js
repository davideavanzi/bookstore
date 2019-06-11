'use strict';

//global db connection variable
let {db, TABLES} = require('./db');

let { createCartForUser } = require("./CartService");

//bcrypt
const bcrypt= require('bcrypt')

//xss sanitizer
var xss = require("xss");


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
    db(TABLES.USER).where({id: userId})
    .catch(error => {
      reject(error);
    })
    .then(function(user) {
      if (Object.keys(user).length > 0) {
        resolve(user);
      } else {
        resolve();
      }
    });  
  });
}


exports.getUserByCookie = function() {
  return new Promise(function(resolve, reject) {
    resolve();  
  });
}

exports.findUser = function(userReq) {
  return new Promise(function(resolve, reject) {
    try {
      db(TABLES.USER).where('email',userReq).select().then(result => {
        if (result.length > 0) {
          resolve(result[0]);
        }
        else{
          console.error("user " + userReq + " not found while login");
          resolve(null);
        }
      });
    }catch(err){
        console.error(err);
        throw(err)
    }});

}

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.password, (err, response) => {
        if (err) {
          console.error("error while checking password");
          reject(err)
        }
        else if (response) {
          console.log("check password successful for user " + foundUser.email);
          resolve(response)
        } else {
          console.error("wrong password for user " + foundUser.email);
          resolve(null);
        }
    })
  )
}


/**
 * Logs user into the system
 *
 * username String The user name for login
 * password String The password for login in clear text
 * no response value expected for this operation
 **/
exports.loginUser = function(body, session) {
  return new Promise(function(resolve, reject) {
    let user;
    exports.findUser(body.email).then(foundUser => {
      if(foundUser){
        return checkPassword(body.password, foundUser);
      } else {
        console.error("username " + body.email + " not found while login");
        reject('401');
      }
    }).then((success) => {
      if(success){
        resolve('200');
      } else {
        reject('401');
      }}).catch((err) => console.error(err));
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
    try {
      db(TABLES.USER).where('email',body.email).select().then(result => {
        if (result.length > 0) {
          console.log("User already registered! Username: " + body.email);
          resolve('403');
        }
        else {
          if (body.password.length > 0 && body.email.length > 0) {
            bcrypt.genSalt (10, (err, salt) => {
              if (err){ 
                console.log("error in salting");
                resolve('500');
                throw(err);
              }
              bcrypt.hash (body.password, salt, (err, hash) => {
                if (err) {
                  console.log("error in hashing");
                  resolve('500');
                  throw (err);
                }
                db(TABLES.USER).insert({
                  email: xss(body.email), 
                  firstName: xss(body.firstName), 
                  lastName: xss(body.lastName), 
                  password: hash, 
                  phone: xss(body.phone), 
                  address: xss(body.address),
                  country: xss(body.country),
                  zip: xss(body.zip)
                })
                //get id of the inserted user and create a cart for it
                .returning('id')
                .then(function(insertedId) {
                  /* DEBUG
                  console.log("inserted:");
                  console.log(insertedId);
                  console.log("provided");
                  console.log(body.id); */
                  createCartForUser(insertedId[0])
                })
                .then(() => {
                  resolve('200');
                });
                console.log("User registered! Username: " + body.email)
              })
            })
          }
          else{
          	console.log("password or email empty while registering");  
            resolve('401');
        	}
        }
      });
    } 
    catch(err){
      console.error(err);
      throw(err)
    }
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
