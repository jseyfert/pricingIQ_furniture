var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
	username: { type: String, required: true },
  password: { type: String, required: true },
	company: { type: String, required: true },
	loggedIn: { type: Boolean }
});

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);