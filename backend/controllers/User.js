'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');
var crypto = require("crypto");

let {db, TABLES} = require('../service/db');

module.exports.deleteUser = function deleteUser (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  User.deleteUser(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserById = function getUserById (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  User.getUserById(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

const findUser = (userReq) => {
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


const updateToken = (token, userReq) => {
  return new Promise(function(resolve, reject) {
    try {
      db(TABLES.USER).where({id: userReq.id}).update({token: token}).then(r => {
        resolve(true);
      })
    }
    catch(err){
        console.error(err);
        throw(err);
    }});
}

const alreadyLoggedIn = (session) => {
  return new Promise(function(resolve, reject){
    if(session && session.loggedin){
      findUser(session.user).then(foundUser => {
        if(foundUser){
          if(session.token){
            resolve(foundUser.token == session.token);
          }
        }
      });
    } else
      resolve(false);    
  })
}



const newSession = (req, body) => {
  return new Promise(function(resolve, reject){
    try {
      req.session.loggedin = true;
      req.session.user = body.email;
      if(body.remember){
        req.sessionOptions.maxAge  =  24 * 60 * 60 * 1000; //one day
        console.log("set one day expiration cookie for user "+body.email);
      }else {
        req.sessionOptions.expires  = false;
        console.log("set a standard session cookie for user "+body.email);
      } 
      let token = crypto.randomBytes(64).toString('hex');
      req.session.token = token;
      findUser(body.email).then(foundUser => {
        if(foundUser){
          updateToken(token, foundUser);
        }
      });
      resolve(req.session);
    }catch(e) {
      console.error(e);
      reject(null);
      throw(e);
    }
  })
}


module.exports.loginUser = function loginUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  var session = req.session;
  alreadyLoggedIn(session).then(result => {
    if (result) {
      console.log("login with cookie for user: "+session.user);
      let response={};
	  response.message = "ok"
      utils.writeJson(res, response, 200);
      return next();
    }else {
      User.loginUser(body, session)
      .then(function (response) {
        if (response == '200'){
          newSession(req, body).then(newSession => {
            session = newSession;
            console.log("session set up for user "+session.user);
            response={};
	  		response.message = "ok"
            utils.writeJson(res, response, 200);
          });
        }
        else {
          console.error("user not login "+body.email+" with cookie");
        }
      })
      .catch(function (response) {
      	if(response == '401') {
      		response={};
        	response.message = "Login failed"
        	utils.writeJson(res, response, 401);
        } else {
        	response={};
        	response.message = "Not allowed"
        	utils.writeJson(res, response, 403);        	
        }
      });
      }
  });
};

module.exports.logoutUser = function logoutUser (req, res, next) {
  User.logoutUser()
    .then(function (response) {
      var responseCode;
      if (req.session.loggedin){
        console.log("session was set "+req.session.loggedin+" for user "+req.session.user);
        req.session.loggedin = false;
        let token = crypto.randomBytes(64).toString('hex');
        findUser(req.session.user).then(foundUser => {
          if(foundUser){
            updateToken(token, foundUser);
          }
        });
        req.session.token='';      
        //req.session.destroy(); //this now not work!
        //which one of the two is better?
        console.log("session is set "+req.session.loggedin+" for user "+req.session.user);
        response={};
        response.message = "ok"
        responseCode = 200;
      } else {
        console.error("user "+req.session.user+" was not logined in with cookie");
		response={};
        response.message = "not logged in"        
        responseCode = 403;
      }
      utils.writeJson(res, response, responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, 500);
    });
};

module.exports.registerUser = function registerUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.registerUser(body)
    .then(function (response) {
      if(response == '200'){
        response={};
		response.message = "ok"
	    utils.writeJson(res, response, 200);
	  } else if (response == '403'){
	  	response={};
		response.message = "Already registered"
	    utils.writeJson(res, response, 403);
	  } else if (response == '401'){
	  	response={};
		response.message = "Incorrect data"
	    utils.writeJson(res, response, 401);
	  }
    })
    .catch(function (response) {
      response={};
	  response.message = "some errors"
      utils.writeJson(res, response, 500);
    });
};

module.exports.updateUser = function updateUser (req, res, next) {
  var userId = req.swagger.params['userId'].value;
  var body = req.swagger.params['body'].value;
  User.updateUser(userId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
