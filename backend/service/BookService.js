'use strict';

//global db connection variable
let {db, TABLES} = require('./db');


/**
 * Book table DB setup
 *
 * Creates a table in the DB to store books
 **/
exports.bookDbSetup = function(database) {
  db = database;
  console.log("Checking if book table exists");
  return new Promise(function(resolve,reject) {
    database.schema.hasTable(TABLES.BOOK).then(exists => {
      if (!exists) { 
        console.log("Book table not found. Creating...");
        database.schema.createTable(TABLES.BOOK, table => {
          table.increments(); //id
          table.string("title");
          table.string("cover");
          table.text("abstract");
          table.text("fact_sheet");
          table.integer("genre_id");
          table.float("value");
          table.integer("stock");
        }).then(exists => {
          console.log("Book table created");
          resolve(exists);
        }).catch(error => {
          console.error(error); 
          reject(error);
        }); 
      } else {
        console.log("Book table already present");
        resolve(exists);
      } 
    }).catch(error => {
      console.error(error); 
      reject(error);
    });
  });
};


/**
 * Add a new book
 * Insert new book in the system - this can only be done by the logged in ADMIN.
 *
 * body Book The book object that needs to be added to the bookstore
 * no response value expected for this operation
 **/
exports.addBook = function(body) {
  return new Promise(function(resolve, reject) {
    console.log("book creation request:");
    console.log(body);
    resolve();
  });
}


/**
 * Delete a specific book
 * Delete a book - this can only be done by the logged in ADMIN.
 *
 * bookId Long The id of the book that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteBook = function(bookId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find book by ID
 * Returns a book with relative authors
 *
 * bookId Long ID of the book to retrieve
 * returns Book
 **/
exports.getBookById = function(bookId) {
  return new Promise(function(resolve, reject) {
    db.select(`${TABLES.BOOK}.*`, `${TABLES.GENRE}.* as genre`)
      .from(TABLES.BOOK)
      .innerJoin(TABLES.GENRE, `${TABLES.GENRE}.id`, `${TABLES.BOOK}.genre_id`)
      .where(`${TABLES.BOOK}.id`, bookId)
    .catch(error => {
      reject(error);
    })
    .then(function(book){
      if (Object.keys(book).length > 0) {  
        book.authors = [];
        book.authors.push(getAuthorsOfBookId(book.id));
        book.themes = [];
        book.themes.push(getThemesOfBookId(book.id));
        resolve(book.reduce((acc, val) => {
          if (!acc.authors) {
            acc = val;
            acc.authors = [];
          }
          acc.authors.push(val.author_name);
          delete acc.author_name;
          return acc;
        }, {}));
      } else {
        //No book found
        resolve();
      }
    });   
  });
}


/**
 * All books, optionally filtered
 * List of books inserted books
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20, max is 500. (optional)
 * authorId Long Id of the author to filter books (optional)
 * returns List
 **/
exports.getBooks = function(offset,limit,authorId,themeId,genreId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.BOOK).limit(limit).offset(offset)
    .modify(function(queryBuilder) {
      if(authorId) {
        //FILTER BY AUTHOR (not extracted from query)
        queryBuilder.leftJoin(TABLES.BOOK_AUTHOR, `${TABLES.BOOK_AUTHOR}.id_book`, `${TABLES.BOOK}.id`)
        .leftJoin(TABLES.AUTHOR, `${TABLES.BOOK_AUTHOR}.id_author`, `${TABLES.AUTHOR}.id`)
        .where(`${TABLES.AUTHOR}.id`, authorId)
      }
      if(themeId) {
        //FILTER BY THEME (not extracted from query)
        queryBuilder.leftJoin(TABLES.BOOK_THEME, `${TABLES.BOOK_THEME}.id_book`, `${TABLES.BOOK}.id`)
        .leftJoin(TABLES.AUTHOR, `${TABLES.BOOK_THEME}.id_theme`, `${TABLES.AUTHOR}.id`)
        .where(`${TABLES.AUTHOR}.id`, authorId)
      }
      if(genreId) {
        //FILTER BY GENRE (not extracted from query)
        queryBuilder.innerJoin(TABLES.GENRE, `${TABLES.GENRE}.id`, `${TABLES.BOOK}.genre_id`)
        .where(`${TABLES.GENRE}.id`, genreId)
      }
    })
    .catch(error => {
      reject(error);
    })
    .then(function(books) {
      if (Object.keys(books).length > 0) {
        resolve(books);
      } else {
        //No books found
        resolve();
      }
    });
  });
}

/**
 * Update a specific book
 * Update values of a book - this can only be done by the logged in ADMIN.
 *
 * bookId Long id of the book that needs to be updated
 * body Book Updated book object
 * no response value expected for this operation
 **/
exports.updateBook = function(bookId,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

/**
 * Find authors of a book by the book ID
 * Returns a list of authors
 *
 * bookId Long ID of the book to retrieve authors
 * returns List
 **/
exports.getAuthorsOfBookId = function(bookId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.AUTHOR)
      .innerJoin(TABLES.BOOK_AUTHOR, `${TABLES.BOOK_AUTHOR}.id_author`, `${TABLES.AUTHOR}.id`)
      .where(`${TABLES.BOOK_AUTHOR}.id_book`, bookId)
    .catch(error => {
      reject(error);
    })
    .then(function(authors){
      if (Object.keys(authors).length > 0) {   
        resolve(authors);
      } else {
        //No authors found
        resolve();
      }
    });
  });
}

/**
 * Find themes of a book by the book ID
 * Returns a list of themes
 *
 * bookId Long ID of the book to retrieve themes
 * returns List
 **/
exports.getThemesOfBookId = function(bookId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.THEME)
      .innerJoin(TABLES.BOOK_THEME, `${TABLES.BOOK_THEME}.id_theme`, `${TABLES.THEME}.id`)
      .where(`${TABLES.BOOK_THEME}.id_book`, bookId)
    .catch(error => {
      reject(error);
    })
    .then(function(themes){
      if (Object.keys(themes).length > 0) {   
        resolve(themes);
      } else {
        //No themes found
        resolve();
      }
    });
  });
}
