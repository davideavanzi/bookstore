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

function setupDataLayer() {
  console.log("Setting up data layer");
  booksDbSetup(sqlDb);
  authorsDbSetup(sqlDb);
  return;
}

module.exports = { database: sqlDb, setupDataLayer };