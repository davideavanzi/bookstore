'use strict';

var utils = require('../utils/writer.js');
var Theme = require('../service/ThemeService');

module.exports.getThemeById = function getThemeById (req, res, next) {
  var themeId = req.swagger.params['themeId'].value;
  Theme.getThemeById(themeId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
};

module.exports.getThemes = function getThemes (req, res, next) {
  console.log("Controller called");
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Theme.getThemes(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
};