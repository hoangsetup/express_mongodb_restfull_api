// app/routes/index.js
var changeCase = require('change-case'),
    express = require('express'),
    config = require('nconf'),
    routes = require('require-dir')();
var pathApi = 'api/' + (config.get('NODE_VERSION') || 'v1');
module.exports = function(app) {
    'use strict';
    // Initialize all routes
    app.use('/' + pathApi, function(req, res) {
        res.sendfile('public/api.html');
    });
    Object.keys(routes).forEach(function(routeName) {
        var router = express.Router();
        // You can add some middleware here
        // router.use(someMiddleware);
        
        // Initialize the route to add its functionality to router
        require('./' + routeName)(router);
        // Add router to the speficied route name in the app
        app.use('/' + pathApi + changeCase.paramCase(routeName), router);
    });
};
