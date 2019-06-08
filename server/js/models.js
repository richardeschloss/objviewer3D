/*
 * models.js - Backend models
 */

/* Requires */
var mongoose = require('mongoose');

/* Private fields */
var dbHost = 'mongodb://localhost/';
var dbName = 'TestDB';

/* Schemas: */

// Password verification
/*
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	cb(null, candidatePassword == this.password);
};
*/

/*
userSchema.methods.comparePassword2 = function(candidatePassword, cb) {
	/*bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});*/
//}; */

/* Public Fields */
exports.dbConnected = false;

/* Public Methods */
exports.connectDB = function( credentials, callback ){
	mongoose.disconnect();
	mongoose.connect(dbHost + dbName);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(){
		console.log("Yay...db connected");
		exports.dbConnected = true;  // TBD.. per client basis
		callback();
	});
};