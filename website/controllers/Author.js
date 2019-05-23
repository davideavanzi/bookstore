'use strict';

var utils = require('../utils/writer.js');
var Author = require('../service/AuthorService');

module.exports.addAuthor = function addAuthor (req, res, next) {
  var body = req.swagger.params['body'].value;
  Author.addAuthor(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteAuthor = function deleteAuthor (req, res, next) {
  var authorId = req.swagger.params['authorId'].value;
  Author.deleteAuthor(authorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAuthorById = function getAuthorById (req, res, next) {
  var authorId = req.swagger.params['authorId'].value;
  Author.getAuthorById(authorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAuthors = function getAuthors (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var bookId = req.swagger.params['bookId'].value;
  Author.getAuthors(offset,limit,bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateAuthor = function updateAuthor (req, res, next) {
  var authorId = req.swagger.params['authorId'].value;
  var body = req.swagger.params['body'].value;
  Author.updateAuthor(authorId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
