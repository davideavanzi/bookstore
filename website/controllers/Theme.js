'use strict';

var utils = require('../utils/writer.js');
var Theme = require('../service/ThemeService');

module.exports.addTheme = function addTheme (req, res, next) {
  var body = req.swagger.params['body'].value;
  Theme.addTheme(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteTheme = function deleteTheme (req, res, next) {
  var themeId = req.swagger.params['themeId'].value;
  Theme.deleteTheme(themeId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getThemeById = function getThemeById (req, res, next) {
  var themeId = req.swagger.params['themeId'].value;
  Theme.getThemeById(themeId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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
      utils.writeJson(res, response);
    });
};

module.exports.updateTheme = function updateTheme (req, res, next) {
  var themeId = req.swagger.params['themeId'].value;
  Theme.updateTheme(themeId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
