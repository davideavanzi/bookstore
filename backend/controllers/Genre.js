'use strict';

var utils = require('../utils/writer.js');
var Genre = require('../service/GenreService');

module.exports.addGenre = function addGenre (req, res, next) {
  var body = req.swagger.params['body'].value;
  Genre.addGenre(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteGenre = function deleteGenre (req, res, next) {
  var genreId = req.swagger.params['genreId'].value;
  Genre.deleteGenre(genreId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGenreById = function getGenreById (req, res, next) {
  var genreId = req.swagger.params['genreId'].value;
  Genre.getGenreById(genreId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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
      utils.writeJson(res, response);
    });
};

module.exports.updateGenre = function updateGenre (req, res, next) {
  var genreId = req.swagger.params['genreId'].value;
  Genre.updateGenre(genreId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
