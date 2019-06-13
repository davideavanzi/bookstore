'use strict';

var utils = require('../utils/writer.js');
var Genre = require('../service/GenreService');

module.exports.getGenreById = function getGenreById (req, res, next) {
  var genreId = req.swagger.params['genreId'].value;
  Genre.getGenreById(genreId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
};

module.exports.getGenres = function getGenres (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Genre.getGenres(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      var responseCode = 500;
      if(response == "404") responseCode = 404;
      utils.writeJson(res, response, responseCode);
    });
};