'use strict';

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

//cookie session modules
let cookieSession = require("cookie-session");
let cookieParser = require("cookie-parser");

//serve static
let serveStatic = require("serve-static");

//data layer setup
let { setupDataLayer } = require("./other/service/db");

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './other/controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

//override default options
var uiOptions = {
  apiDocs: '/backend/api-docs', 
  swaggerUi: '/backend/swaggerui'
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'other/api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Add cookies to responses
app.use(cookieParser());
app.use(cookieSession({ name: "session", keys: ["abc", "def"] }));

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi(uiOptions));

  //directory to serve static pages
  app.use(serveStatic(__dirname + "/public"));

  setupDataLayer().then(() => {
    // Start the server, only after having set up datalayer
    http.createServer(app).listen(serverPort, function() {
      console.log(
        "Your server is listening on port %d (http://localhost:%d)",
        serverPort,
        serverPort
      );
      console.log(
        "Swagger-ui is available on http://localhost:%d/backend/swaggerui",
        serverPort
      );
    });
  });
});
