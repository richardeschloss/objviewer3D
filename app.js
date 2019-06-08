/*
 *  app.js -- Express application and boilerplate configuration
 */

/* Requires */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('MEAN');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bb = require('express-busboy'); // TBD

/* Setup passport */
var session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;


/* View engine setup */
/* (server-side views; app-side views handled by ngRoute) */
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'jade');

/* Config */
app.use(logger('dev'));
bb.extend(app, {
    upload: true,
    path: 'public/assets/tmp'
});

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(cookieParser());

/* Use passport */
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'bower_components')));
app.use('/', express.static(path.join(__dirname, 'public')));

/* Routes */
app.use('/', require('./server/js/routes')([io, passport, LocalStrategy]));

/* Error Handlers */
// Catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler (will print stacktrace)
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
        	title: "Oops, not found!",
            message: err.message,
            error: err
        });
    });
}

// Production error handler (no stacktraces leaked to user)
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/* Start listening */
app.set('port', 8000);
http.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
