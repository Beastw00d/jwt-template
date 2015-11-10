/*jshint node:true*/
'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();

var environment = process.env.NODE_ENV;

var app = express();
app.use(function(req, res, next) {
	   res.header('Access-Control-Allow-Origin', '*');
	   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   	   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	   next();
});
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api', require('./routes'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment){
    case 'build':
        console.log('** BUILD **');
        connectToDB(false);
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        connectToDB(true);
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());
});

// todo move connection string to config file
// todo set up production connection string
function connectToDB(isDev /* is dev environment */) {
    var connectionString = '';
    console.log('** Connecting to the database');
    if (isDev) {
        connectionString = 'mongodb://admin:snotfalls@ds049104.mongolab.com:49104/pets';
    } else {
        connectionString = 'mongodb://admin:snotfalls@ds049104.mongolab.com:49104/pets';
    }
    mongoose.connect(connectionString);
}