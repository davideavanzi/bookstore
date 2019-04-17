const sqlDbFactory = require("knex");

let { booksDbSetup } = require("./BookService");
let { authorsDbSetup } = require("./AuthorService");
let { cartDbSetup } = require("./CartService");
let { eventDbSetup } = require("./EventService");
let { genreDbSetup } = require("./GenreService");
let { interviewDbSetup } = require("./InterviewService");
let { reservationDbSetup } = require("./ReservationService");
let { reviewDbSetup } = require("./ReviewService");
let { themeDbSetup } = require("./ThemeService");
let { userDbSetup } = require("./UserService");
let { book_authorDbSetup, theme_bookDbSetup, cart_bookDbSetup } = require("./TablesSetup");

/**
 * Db connection setup
 * parameters:
 *  username: postgres
 *  password: postgres
 *  db name: postgres
 */
let sqlDb = sqlDbFactory({
  client: "pg",
  connection: 'postres://postgres:postgres@localhost/postgres',
  ssl: true,
  debug: true
});

/**
 * Syncronous setup of the data layer.
 * This function waits for all tables to set up correctly before returning to its caller
 */
function setupDataLayer() {
  console.log("Setting up data layer");
  return new Promise(resolve => {
    Promise.all([
      booksDbSetup(sqlDb),
      authorsDbSetup(sqlDb),
      cartDbSetup(sqlDb),
      cartDbSetup(sqlDb),
      eventDbSetup(sqlDb),
      genreDbSetup(sqlDb),
      interviewDbSetup(sqlDb),
      reservationDbSetup(sqlDb),
      reviewDbSetup(sqlDb),
      themeDbSetup(sqlDb),
      userDbSetup(sqlDb),
      book_authorDbSetup(sqlDb),
      cart_bookDbSetup(sqlDb),
      theme_bookDbSetup(sqlDb)
    ]).then(values => { 
      resolve(values.every(Boolean));
      console.log("Database setup complete with status: "+values.every(Boolean));
    }).catch(err => {
      console.err("Error setting up database.");
      console.err(err);
      reject();
    });
  })
}



module.exports = { database: sqlDb, setupDataLayer };
