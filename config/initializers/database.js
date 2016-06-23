// config/initializers/database.js
var config = require('nconf');
var mongoose = require('mongoose');
var logger = require('winston');
module.exports = function(cb) {
    'use strict';
    // Initialize the component here then call the callback
    var connectionString = config.get('NODE_DATABASE') || 'mongodb://localhost/local';
    mongoose.connect(connectionString, function(err) {
        if (err) {
            logger.error('[DATABASE] error connection');
        }
    });
    // Return the call back
    if (cb && typeof cb === 'function') {
        cb();
    }
};
