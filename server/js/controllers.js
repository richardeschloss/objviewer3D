/*
 * Controller.js - Backend controllers
 */

/* Requires */
var model = require('./models');
var nodemailer = require('nodemailer');
var services = require('./services');

/* Private fields */
var controller = new Object();
var openConnections = [];

/* Private methods */
var keys = function( obj ){
    var tmp = [];
    for(var k in obj)
    	if( ignoreKeys.indexOf(k) == -1)
    		tmp.push(k);
    return tmp;
}

var setupPassport = function(){
	passport.serializeUser(function(user, done) {
		console.log('passport.serializeUser');
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		console.log('passport.deserializeUser');
		model.User.findById(id, function (err, user) {
		    done(err, user);
		});
	});

	passport.use(new LocalStrategy(function(username, password, done) {
	 model.User.findOne({ username: username }, function(err, user) {
	   console.log('model.User.findOne callback');
	   if (err) { return done(err); }
	   if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
	   user.comparePassword(password, function(err, isMatch) {
	     if (err) return done(err);
	     if(isMatch) {
	       return done(null, user);
	     } else {
	       return done(null, false, { message: 'Invalid password' });
	     }
	   });
	 });
	}));
};

/* Constructor */
function controllers(args){

	// Parse args:
	io = args[0];
	passport = args[1];
	LocalStrategy = args[2];

	// Setup passport:
	setupPassport();

	// Connect to DB:
	//model.connectDB('',function(){});  // TBD: re-enable when ready

	// On IO connection:
	io.on('connection', function(socket){
	  openConnections.push(socket);
	  console.log("Client connected");

	  socket.on('clientMsg',function(msg){
		 console.log("Message received from client");
		 console.log(msg);
	  });

	  socket.on('disconnect', function () {
		console.log('Client disconnected');
		clientCnt--;
		//io.sockets.emit('client disconnected');
	  });
	});

	/* Public Methods */
	controller.renderDefault = function(req, res) {
      res.render('default', { title: 'Express', data: { text: 'Default Page' }});
	};

	controller.upload3DFile = function(req, res){
	  res.json({'uploadedFile': req.files.uploadedFile.file.replace(/\\/g,'/').replace(/public\//,'') });
	};

	return controller;

};

module.exports = controllers;
