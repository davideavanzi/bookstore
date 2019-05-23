'use strict';

//global db connection variable
let {db, TABLES} = require('./db');


/**
 * Add a new interview
 * Insert a new interview in the system - this can only be done by logged users.
 *
 * body Interview The interview object that needs to be added
 * no response value expected for this operation
 **/
exports.addInterview = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a specific interview
 * Delete a interview - this can only be done by the logged in ADMIN or the user that made it.
 *
 * interviewId Long The id of the interview that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteInterview = function(interviewId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find interview by ID
 * Insert get a single reservation in the system - this can only be done by logged users or admin.
 *
 * interviewId Long ID of the interview to retrieve
 * returns Interview
 **/
exports.getInterviewById = function(interviewId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.INTERVIEW).where({id: interviewId})
    .catch(error => {
      reject(error);
    })
    .then(function(interview) {
      if (Object.keys(interview).length > 0) {
        resolve(interview);
      } else {
        resolve();
      }
    });  
  });
}


/**
 * All interviews, optionally filtered
 * List of interviews
 *
 * offset Integer Pagination offset. Default is 0 (optional)
 * limit Integer Maximum number of items per page. Default is 20, max is 500. (optional)
 * bookId Integer Id of the book to get interviews (optional)
 * returns List
 **/
exports.getInterviews = function(offset,limit,bookId) {
  return new Promise(function(resolve, reject) {
    db(TABLES.INTERVIEW).limit(limit).offset(offset)
    .modify(function(queryBuilder) {
      if (bookId) {
        queryBuilder.where({'id_book': bookId});
      }
    })
    .catch(error => {
      reject(error);
    })
    .then(function (interviews) {
      if (Object.keys(interviews).length > 0) {
        resolve(interviews);
      } else {
        //no events found
        resolve();
      }
    }); 
  });
}


/**
 * Update a specific interview
 * Update values of a interview - this can only be done by the logged in ADMIN or the user that made it.
 *
 * interviewId Long id of the interview that needs to be updated
 * no response value expected for this operation
 **/
exports.updateInterview = function(interviewId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}