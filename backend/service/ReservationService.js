'use strict';

//global db connection variable
let sqlDb;

/**
 * Reservation table DB setup
 *
 * Creates a table in the DB to store reservations
 **/
exports.reservationDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if reservation table exists");
  return new Promise(resolve => {
    database.schema.hasTable("reservation").then(exists => {
      if (!exists) { 
        console.log("Reservation table not found. Creating...");
        database.schema.createTable("reservation", table => {
          table.increments(); //id
          table.integer("amount");
          table.integer("book_id");
          table.integer("book_id");
        }).then(exists => {
          console.log("Reservation table created");
          resolve(exists);
        }).catch(error => {
          console.error(error); 
          reject(error);
        }); 
      } else {
        console.log("Reservation table already present");
        resolve(exists);
      } 
    }).catch(error => {
      console.error(error); 
      reject(error);
    });
  });
};

/**
 * Add a new reservation
 * Insert a new reservation in the system - this can only be done by logged users.
 *
 * body Reservation The reservation object that needs to be added
 * no response value expected for this operation
 **/
exports.addReservation = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a specific reservation
 * Delete a reservation - this can only be done by the logged in ADMIN or the user that made it.
 *
 * reservationId Long The id of the reservation that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteReservation = function(reservationId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find reservation by ID
 * Insert get a single reservation in the system - this can only be done by logged users or admin.
 *
 * reservationId Long ID of the reservation to retrieve
 * returns Reservation
 **/
exports.getReservationById = function(reservationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "quantity" : 6,
  "book" : {
    "photoUrl" : "photoUrl",
    "price" : {
      "currency" : "EUR",
      "value" : 65
    },
    "author" : [ {
      "name" : "name",
      "id" : 6
    }, {
      "name" : "name",
      "id" : 6
    } ],
    "name" : "name",
    "genre" : [ "genre", "genre" ],
    "id" : 0,
    "abstract" : "abstract"
  },
  "userId" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * All reservations, optionally filtered
 * List of reservations
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20, max is 500. (optional)
 * userId Integer Id of the user that made the reservation (optional)
 * bookId Integer Id of the book to get reservations (optional)
 * returns List
 **/
exports.getReservations = function(offset,limit,userId,bookId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "quantity" : 6,
  "book" : {
    "photoUrl" : "photoUrl",
    "price" : {
      "currency" : "EUR",
      "value" : 65
    },
    "author" : [ {
      "name" : "name",
      "id" : 6
    }, {
      "name" : "name",
      "id" : 6
    } ],
    "name" : "name",
    "genre" : [ "genre", "genre" ],
    "id" : 0,
    "abstract" : "abstract"
  },
  "userId" : 0
}, {
  "quantity" : 6,
  "book" : {
    "photoUrl" : "photoUrl",
    "price" : {
      "currency" : "EUR",
      "value" : 65
    },
    "author" : [ {
      "name" : "name",
      "id" : 6
    }, {
      "name" : "name",
      "id" : 6
    } ],
    "name" : "name",
    "genre" : [ "genre", "genre" ],
    "id" : 0,
    "abstract" : "abstract"
  },
  "userId" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a specific reservation
 * Update values of a reservation - this can only be done by the logged in ADMIN or the user that made it.
 *
 * reservationId Long id of the reservation that needs to be updated
 * reservationAmount Long Updated reserved book amount (optional)
 * no response value expected for this operation
 **/
exports.updateReservation = function(reservationId,reservationAmount) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

