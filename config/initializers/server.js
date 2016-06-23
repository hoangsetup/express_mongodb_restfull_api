// config/initializers/server.js
var express = require('express'),
    path = require('path'),
    config = require('nconf');
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    logger = require('winston');
var app;
var start = function(cb) {
    'use strict';
    app = express();
    switch(config.get('NODE_ENV')){
        case 'dev':
            app.use(morgan('dev'));
            break;
        default:
            app.use(morgan('common'));
            break;
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json({
        type: '*/*'}
    ));
    logger.info('[SERVER] Initializing routes');
    require('../../app/routes/index')(app);
    app.use(express.static(path.join(__dirname, 'public')));

    // CORS (Cross Origin Request Sharing)
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });

    // Error handler
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: app.get('evn') === 'dev' ? err : {}
        });
        next(err);
    });


    var PORT = config.get('NODE_PORT') || 8080;
    app.listen(PORT, function() {
        logger.info('[SERVER] Listening on port ' + PORT);
    });
    if (cb && typeof cb === 'function') {
        return cb();
    }
};
module.exports = start;