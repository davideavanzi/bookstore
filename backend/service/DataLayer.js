const sqlDbFactory = require("knex");

let { booksDbSetup } = require("./BookService");

let sqlDb = sqlDbFactory({
  client: "pg",
  connection: 'postres://postgres:postgres@localhost/postgres',
  ssl: true,
  debug: true
});

function setupDataLayer() {
  console.log("Setting up data layer");
  return booksDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };
