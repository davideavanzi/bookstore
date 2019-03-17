'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService');

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
  Book.getBooks(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
