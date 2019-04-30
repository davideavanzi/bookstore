'use strict';

//global db connection variable
let sqlDb;
const bcrypt= require('bcrypt')

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
          table.string("firstName");
          table.string("lastName");
          table.string("email");
          table.string("phone");
          table.string("role");
          table.string("password");
          table.string("salt");
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


const findUser = (userReq) => {
  return database.raw("SELECT * FROM users WHERE username = ?", [body.username])
    .then((data) => data.rows[0])
}

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.password, (err, response) => {
        if (err) {
          reject(err)
        }
        else if (response) {
          resolve(response)
        } else {
          reject(new Error('Passwords do not match.'))
        }
    })
  )
}

const updateUserToken = (token, user) => {
  return database.raw("UPDATE users SET token = ? WHERE id = ? RETURNING id, username, token", [token, user.id])
    .then((data) => data.rows[0])
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
    console.log(body);
    const signin = (request, response) => {
      const userReq = request.body
      let user

      findUser(userReq)
        .then(foundUser => {
          user = foundUser
          return checkPassword(body.password, foundUser)
        })
        //.then((res) => createToken())
        //.then(token => updateUserToken(token, user))
        .then(() => {
          //delete user.password
          response.status(200).json(user)
        })
        .catch((err) => console.error(err))
    }
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
      console.log(body.email);
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
                    let insert = sqlDb('users').insert({email: body.email, firstName: body.firstName, lastName: body.lastName, password: hash})//, phone: body.phone, role: body.role, salt: salt});
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

