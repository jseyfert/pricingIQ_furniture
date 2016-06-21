var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel.js');
var passport = require('passport');

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
		console.log("This is the user: ", user);
	});

	passport.deserializeUser(function(id, done){
		console.log("This is the user ID: ", id);
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
					return done(null, false, { message: 'That email is already taken' });
				} else {
					var newUser = new User();

					newUser.email = email;
					newUser.password = newUser.generateHash(password);
					newUser.username = req.body.username;
					newUser.role = 'guest';

					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser, { message: 'You successfully signed up.' });
					})
				}
			});
		});
	}));			
	
};
