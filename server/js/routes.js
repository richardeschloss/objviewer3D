/*
 * routes.js - Backend routes
 */

/* Requires */
var express = require('express');
var router = express.Router();
var controller;

/*
 * Routes constructor
 */
function routes(args){

	controller = require('./controllers')(args);

	/* GET requests */
	router.get('/default', 	controller.renderDefault);

	/* POST requests */
	router.post('/upload3DFile', controller.upload3DFile );

	/* PUT requests */

	/* DELETE requests */

	return router;
};

module.exports = routes;
