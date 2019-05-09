'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService');

module.exports.addBook = function addBook (req, res, next) {
  var body = req.swagger.params['body'].value;
  Book.addBook(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteBook = function deleteBook (req, res, next) {
  var bookId = req.swagger.params['bookId'].value;
  Book.deleteBook(bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookById = function getBookById (req, res, next) {
  var bookId = req.swagger.params['bookId'].value;
  Book.getBookById(bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBooks = function getBooks (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var authorId = req.swagger.params['authorId'].value;
  var themeId = req.swagger.params['themeId'].value;
  var genreId = req.swagger.params['genreId'].value;
  Book.getBooks(offset,limit,authorId,themeId,genreId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateBook = function updateBook (req, res, next) {
  var bookId = req.swagger.params['bookId'].value;
  var body = req.swagger.params['body'].value;
  Book.updateBook(bookId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
