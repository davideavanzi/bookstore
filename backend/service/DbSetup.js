const knex = require('knex');  
const environment = 'development'  
const config = require('../knexfile');

let sqlDb = knex(config[environment]);

//table names conversion
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

//DB Setup to latest migration
function setupDataLayer () {
    console.log("Setting up data layer");
    return new Promise(resolve => {
        //checking if migration is up to date
        console.log("(1/3) running [knex.migrate.latest()]");
        sqlDb.migrate.latest().then(function () {
            console.log("(2/3) running [knex.seed.run()]");
            //seed database TODO
            //return sqlDb.seed.run();
        }).then(function () {
            var s = "(3/3) database ready.";
            resolve();
        }).catch(err => {
            console.error("Error setting up database:");
            console.error(err.message);
            //reject(); TODO
        });
    })
  }


module.exports = { database: sqlDb, setupDataLayer };