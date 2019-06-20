'use strict';

//global db connection variable
let {db, TABLES} = require('./db');


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
