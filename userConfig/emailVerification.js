
// var EmailVerification = {
//   emailVerificationExpires: Date.now() + 3600000, // 1 hour
//   permalink: 'testONE',//email.toLowerCase().replace(' ', '').replace(/[^\w\s]/gi, '').trim(),
//   emailVerificationToken: 'testTWO', //randomstring.generate({ length: 32 }),
//   link: "http://localhost:7070" + "/verifyEmail/" + this.permalink + "/" + this.emailVerificationToken,
// }

// EmailVerification.methods.generatelink = function(password){
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// module.exports = EmailVerification;



// var UserSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   user: { type: String, required: true },
//   company: { type: String, required: true },

//   resetCountAfter: { type: Number},
//   countLeftToSubmit: [{ domain : String, count : Number }],

//   verified: { type: Boolean, required: true  },
//   permalink: { type: String, required: true },
//   emailVerificationToken: { type: String, required: true },
//   emailVerificationExpires: { type: Date },

//   passwordResetToken: { type: String },
//   passwordResetExpires: { type: Date },
// });

// UserSchema.methods.generateHash = function(password){
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// UserSchema.methods.validPassword = function(password){
//   return bcrypt.compareSync(password, this.password);
// };

// module.exports = mongoose.model('User', UserSchema);
