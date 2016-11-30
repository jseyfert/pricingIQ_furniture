var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new mongoose.Schema({
	email: { type: String, required: true },
  password: { type: String, required: true },
  user: { type: String, required: true },
  company: { type: String, required: true },

  resetCountAfter: { type: Number},
  countLeftToSubmit: [{ domain : String, count : Number }],

  verified: { type: Boolean, required: true  },
  permalink: { type: String, required: true },
  emailVerificationToken: { type: String, required: true },
  emailVerificationExpires: { type: Date },

  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
});

UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);