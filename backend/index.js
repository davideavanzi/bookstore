'use strict';

var express = require('express');
require('dotenv').config();

var flash = require('connect-flash');

var passport = require("passport");
var request = require('request');

var session = require("express-session");

var app = express();

app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(require('body-parser').urlencoded({ extended: true }));

app.use(passport.initialize());
//app.use(express.session());
app.use(passport.session());

var bodyParser = require('body-parser')

var path = require('path');

app.use('/public', express.static(__dirname + '/public'));

app.use(flash());
app.use(session({ 
    secret: 'keyboard cat', 
    cookie: { 
        secure: false
}}));
app.use(bodyParser());

require('./lib/routes.js')(app);









var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
//support for heroku server port
var serverPort = process.env.PORT || 8080;

//timestamp to console logs
require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });

let serveStatic = require("serve-static");

//data layer setup
let { setupDataLayer } = require("./service/DataLayer");

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  //directory to serve static pages
  app.use(serveStatic(__dirname + "/www"));

  setupDataLayer().then(() => {
    // Start the server, only after setting up datalayer
    http.createServer(app).listen(serverPort, function() {
      console.log(
        "Your server is listening on port %d (http://localhost:%d)",
        serverPort,
        serverPort
      );
      console.log(
        "Swagger-ui is available on http://localhost:%d/docs",
        serverPort
      );
    });
  });
});
