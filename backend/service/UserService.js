'use strict';

//global db connection variable
let sqlDb;
const bcrypt= require('bcrypt');



/**
 * user table DB setup
 *
 * Creates a table in the DB to store user
 **/
exports.userDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if users table exists");
  return new Promise(function(resolve,reject) {
    database.schema.hasTable("users").then(exists => {
      if (!exists) { 
        console.log("Users table not found. Creating...");
        database.schema.createTable("users", table => {
          table.increments(); //id
          table.string("firstName");
          table.string("lastName");
          table.string("email");
          table.string("phone");
          table.string("role");
          table.string("password");
        }).then(exists => {
          console.log("users table created");
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
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


const findUser = (userReq) => {
  return new Promise(function(resolve, reject) {
    try {
      sqlDb('users').where('email',userReq).select().then(result => {
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
    console.log(session.loggedin);
    let user;
    findUser(body.email).then(foundUser => {
      console.log(foundUser);
      if(foundUser){
        return checkPassword(body.password, foundUser);
      } else {
        console.error("username " + body.email + " not found while login");
        reject('403');
      }
    }).then((success) => {
      if(success){
        resolve('200');
      } else {
        reject('403');
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
          sqlDb('users').where('email',body.email).select().then(result => {
            if (result.length > 0) {
              console.log("User already registered! Username: " + body.email);
              resolve("User already registered! Username: " + body.email);
            }
            else {
              if (body.password.length > 0) {
                bcrypt.genSalt (10, (err, salt) => {
                  if (err){ 
                    console.log("error in salting");
                    resolve("some errors occours");
                    throw(err);
                  }
                  bcrypt.hash (body.password, salt, (err, hash) => {
                    if (err) {
                      console.log("error in hashing");
                      resolve("some errors occours");
                      throw (err);
                    }
                    console.log("hashed and salted passwd: "+ hash);
                    let insert = sqlDb('users').insert({email: body.email, firstName: body.firstName, lastName: body.lastName, password: hash})//, phone: body.phone, role: body.role});
                    resolve(insert);
                    console.log("User registered! Username: " + body.email)
                  })
                })
              }
              else  
                resolve("body.password empty");
            }
          });
      } 
      catch(err){
        console.error(err);
        throw(err)
      }

    });}



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

