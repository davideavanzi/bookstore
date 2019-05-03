'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');





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

module.exports.loginUser = function loginUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  var session = req.session;
  console.log(session);
  console.log(session.loggedin);
  console.log(session.user);

  if(session && session.loggedin && session.user == body.email){
    console.log("login with cookie for user: "+body.email);
    utils.writeJson(res, '200');
    return next();
  }
  User.loginUser(body, session)
    .then(function (response) {
      if (response == '200'){
        console.log("session set true for user "+body.email);
        session.loggedin = true;
        session.user = body.email;
      } else {
        console.error("user not login "+body.email+" with cookie");
        session.loggedin = false;
      }
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logoutUser = function logoutUser (req, res, next) {
  User.logoutUser()
    .then(function (response) {
      if (req.session.loggedin){
        console.log("session was set "+req.session.loggedin+" for user "+req.session.user);
        req.session.loggedin = false;         
        //req.session.destroy(); //this now not work!
        //which one of the two is better?
        console.log("session is set "+req.session.loggedin+" for user "+req.session.user);
        response='200';
      } else {
        console.error("user "+req.session.user+" was not logined in with cookie");
        response='403';
      }
      console.log(req.session.loggedin);
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registerUser = function registerUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.registerUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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
