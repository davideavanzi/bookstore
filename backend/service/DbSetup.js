const knex = require('knex');  
const environment = 'development'  
const config = require('../knexfile');

exports.sqlDB = knex(config[environment]);

exports.TABLES =  {  
    AUTHOR: 'author',
    BOOK: 'book',
    CART: 'cart',
    EVENT: 'event',
    GENRE: 'genre',
    INTERVIEW: 'interview',
    RESERVATION: 'reservation',
    REVIEW: 'review',
    THEME: 'theme',
    USER: 'users',
    BOOK_AUTHOR: 'book_author',
    BOOK_THEME: 'theme_book',
    BOOK_CART: 'cart_book'
};