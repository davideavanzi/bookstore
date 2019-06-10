'use strict';

//global db connection variable
let {db, TABLES} = require('./db');


/**
 * Add a new event
 * Insert a new event in the system - this can only be done by logged in ADMIN.
 *
 * body Event The review object that needs to be added
 * no response value expected for this operation
 **/
exports.addEvent = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a specific event
 * Delete a event - this can only be done by the logged in ADMIN.
 *
 * eventId Long The id of the event that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteEvent = function(eventId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find event by ID
 * Returns a event
 *
 * eventId Long ID of the event to retrieve
 * returns Event
 **/
exports.getEventById = function(eventId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.EVENT).where({id: eventId})
    .catch(error => {
      reject(error);
    })
    .then(function(events) {
      if (Object.keys(events).length > 0) {
        resolve(events);
      } else {
        resolve();
      }
    });  
  });
}


/**
 * All events, optionally filtered
 * List of events
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20, max is 500. (optional)
 * bookId Integer Id of the presented book on the event (optional)
 * returns List
 **/
exports.getEvents = function(offset,limit,bookId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.EVENT).limit(limit).offset(offset).orderBy('datetime')
    .modify(function(queryBuilder) {
      if (bookId) {
        queryBuilder.where({'id_book': bookId});
      }
    })
    .catch(error => {
      reject(error);
    })
    .then(function (events) {
      if (Object.keys(events).length > 0) {
        resolve(events);
      } else {
        //no events found
        resolve();
      }
    }); 
  });
}


/**
 * Update a specific event
 * Update values of a review - this can only be done by the logged in ADMIN.
 *
 * eventId Long id of the event that needs to be updated
 * body Event Updated event object
 * no response value expected for this operation
 **/
exports.updateEvent = function(eventId,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

