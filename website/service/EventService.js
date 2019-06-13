'use strict';

//global db connection variable
let {db, TABLES} = require('./db');


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
        reject("404");
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
        reject("404");
      }
    }); 
  });
}