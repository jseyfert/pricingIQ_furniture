var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel.js');
var passport = require('passport'); //i dont think this needs to be here

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
		// console.log("This is the user: ", user);
	});

	passport.deserializeUser(function(id, done){
		// console.log("This is the user ID: ", id);
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
					return done(null, false, { message: 'That email is already taken2' });
				// if (req.body.password != req.body.confirm_password) {
    //                 console.log('Passwords do not match');
    //                 return done(null, false, { message: 'Passwords do not match' });
				} else {
					var newUser = new User();

					newUser.email = email;
					newUser.password = newUser.generateHash(password);
					newUser.user = req.body.user;
					newUser.company = req.body.company;
					newUser.canSubmitAfter = 0;

					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser, { message: 'You successfully signed up.' });
					})
				}
			});
		});
	}));			

    //                         // create the user
    //                         var newUser = new User();
    //                         var permalink = req.body.username.toLowerCase().replace(' ', '').replace(/[^\w\s]/gi, '').trim();
    //                         var verification_token = randomstring.generate({
    //                             length: 64
    //                         });

    //                         newUser.local.email = email;
    //                         newUser.local.password = newUser.generateHash(password);
    //                         newUser.local.permalink = permalink;

    //                         //Verified will get turned to true when they verify email address
    //                         newUser.local.verified = false;
    //                         newUser.local.verify_token = verification_token;

    //                         try {
    //                             newUser.save(function (err) {
    //                                 if (err) {
    //                                     throw err;
    //                                 } else {
    //                                     VerifyEmail.sendverification(email, verification_token, permalink);
    //                                     return done(null, newUser);
    //                                 }
    //                             });
    //                         } catch (err) {

    //                         }
    //                     }
    //                 });
    //             }
    //         });
    //     });
    // }));



};
