var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
  password: { type: String, required: true },
  user: { type: String, required: true },
  company: { type: String, required: true },
  
  canSubmitAfter: { type: Number, required: true  }, // change to date at some point & restUrlCountAfter
  urlsLeftToSubmit: { type: Array},

  permalink: { type: String, required: true },
  verificationToken: { type: String, required: true },
  verified: { type: Boolean, required: true  },

  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },


	loggedIn: { type: Boolean } //get rid of at some point
});

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);