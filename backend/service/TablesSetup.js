/****************************************************
 * 
 * Auxiliary tables DB setup functions
 * 
 ****************************************************/

/**
 * Books-Authors table DB setup
 *
 * Creates a table in the DB to store relations between authors and books
 **/
exports.authorshipDbSetup = function(database) {
    sqlDb = database;
    console.log("Checking if authorship table exists");
    return database.schema.hasTable("authorship").then(exists => {
      if (!exists) {
        console.log("Table not found. Creating...");
        return database.schema.createTable("authorship", table => {
          table.integer("bookId");
          table.integer("authorId");
        });
      }
    });
  };


/**
 * genres table DB setup
 *
 * Creates a table in the DB to store relations between authors and books
 **/
exports.genresDbSetup = function(database) {
    sqlDb = database;
    console.log("Checking if genres table exists");
    return database.schema.hasTable("genres").then(exists => {
      if (!exists) {
        console.log("Table not found. Creating...");
        return database.schema.createTable("genres", table => {
          table.increments();
          table.text("name");
        });
      }
    });
  };


/**
 * book_genres table DB setup
 *
 * Creates a table in the DB to store relations between genres and books
 **/
exports.bookGenresDbSetup = function(database) {
    sqlDb = database;
    console.log("Checking if book_genres table exists");
    return database.schema.hasTable("book_genres").then(exists => {
      if (!exists) {
        console.log("Table not found. Creating...");
        return database.schema.createTable("book_genres", table => {
          table.integer("bookId");
          table.text("genreId");
        });
      }
    });
  };
