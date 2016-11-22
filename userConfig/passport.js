var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel.js');
var SendMail = require('./email.js');
var passport = require('passport'); //i dont think this needs to be here
var randomstring = require("randomstring");

var activeDomains = ['amazon', 'sears', 'walmart']
var countLeftToSubmit = activeDomains.map(function(item){return [item, 15]})



module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user)
		})
	});

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		User.findOne({ email: email }, function(err, user){
			if(err)
				return done(err);
			if(!user)
				return done(null, false, { message: 'We could not find your email address.' });
			if(!user.validPassword(password))
				return done(null, false, { message: 'Wrong password. Try again.'});
			return done(null, user, { message: 'You logged in successfully' });
		});
	}));	


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		process.nextTick(function(){
			User.findOne({ email: email }, function(err, user){
				if(err)
					return done(err);
				if(user) {
					return done(null, false, { 
            message: 'That email is taken' 
          });
				} else {
					var newUser = new User();
          var permalink = email.toLowerCase().replace(' ', '').replace(/[^\w\s]/gi, '').trim();
          var verificationToken = randomstring.generate({ length: 64 });
          var link = "http://localhost:7070" + "/verify/" + permalink + "/" + verificationToken;

          newUser.permalink = permalink;
          newUser.verificationToken = verificationToken;
          newUser.verified = false;

          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.user = req.body.user;
          newUser.company = req.body.company;
          newUser.canSubmitAfter = 0;
          newUser.countLeftToSubmit = countLeftToSubmit;

          newUser.save(function(err){
            if(err) {
              throw err;
            } else {
              SendMail(req.body.user, email, link, null)
              return done(null, newUser, { message: 'You successfully signed up.' });
            }
          })
        }
      });
    });
  }));      
};
