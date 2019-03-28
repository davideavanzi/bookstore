const sqlDbFactory = require("knex");

let { booksDbSetup } = require("./BookService");
let { authorsDbSetup } = require("./AuthorService");

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
      authorsDbSetup(sqlDb)
    ]).then(values => { 
      resolve(values.every(Boolean));
      console.log("Database setup complete with status: "+values.every(Boolean));
    });
  })
}



module.exports = { database: sqlDb, setupDataLayer };