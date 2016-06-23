// index.js
var server = require('./config/initializers/server'),
    nconf = require('nconf'),
    async = require('async'),
    logger = require('winston');
// Load Environment variables from .env file
require('dotenv').load();
nconf.use('memory');
// Load command line arguments
nconf.argv();
// Load environment variables
nconf.env();

// Load config file for the environment
if (nconf.get('NODE_ENV')) {
    //require('./config/environments/' + nconf.get('NODE_ENV'));
}

logger.info('[APP] Starting server initialization');
// Initialize Modules
async.series([
    function initializeDBConnection(callback) {
        require('./config/initializers/database')(callback);
    },
    function startServer(callback) {
        server(callback);
    }], function(err) {
        if (err) {
          logger.error('[APP] initialization failed', err);
        } else {
          logger.info('[APP] initialized SUCCESSFULLY');
        }
    }
);
