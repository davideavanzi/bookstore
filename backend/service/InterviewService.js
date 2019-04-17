'use strict';

//global db connection variable
let sqlDb;

/**
 * Interview table DB setup
 *
 * Creates a table in the DB to store interviews
 **/
exports.interviewDbSetup = function(database) {
  sqlDb = database;
  console.log("Checking if interview table exists");
  return new Promise(function(resolve,reject) {
    database.schema.hasTable("interview").then(exists => {
      if (!exists) { 
        console.log("Interview table not found. Creating...");
        database.schema.createTable("interview", table => {
          table.increments(); //id
          table.string("title");
          table.text("content");
          table.string("interviewer");
          table.integer("book_id");
        }).then(exists => {
          console.log("Interview table created");
          resolve(exists);
        }).catch(error => {
          console.error(error); 
          reject(error);
        }); 
      } else {
        console.log("Interview table already present");
        resolve(exists);
      } 
    }).catch(error => {
      console.error(error); 
      reject(error);
    });
  });
};

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
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "title" : "title",
  "content" : "content",
  "interviewr" : "interviewer",
  "bookId" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "title" : "title",
  "content" : "content",
  "interviewr" : "interviewer",
  "bookId" : 1
}, {
  "id" : 0,
  "title" : "title",
  "content" : "content",
  "interviewr" : "interviewer",
  "bookId" : 1
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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

