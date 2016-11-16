var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel.js');
var passport = require('passport'); //i dont think this needs to be here
var nodemailer = require('nodemailer');
var randomstring = require("randomstring");

var transporter = nodemailer.createTransport('smtps://johnseyfertfake%40gmail.com:1982johnfake@smtp.gmail.com');

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
					return done(null, false, { 
            message: 'That email is already taken3' 
          });
				} else {
					var newUser = new User();
          var permalink = email.toLowerCase().replace(' ', '').replace(/[^\w\s]/gi, '').trim();
          var verificationToken = randomstring.generate({ length: 64 });
          var link = "http://localhost:7070" + "/verify/" + permalink + "/" + verificationToken;

          var mailOptions = {
            from: '"pricingIQ" <johnseyfert@gmail.com>', // sender address 
            to: 'johnseyfert@gmail.com', // list of receivers 
            subject: 'Validate Your Email ✔', // Subject line 
            text: 'please use html format', // plaintext body 
            html : "Please Click the link to verify your email.<br><a href=" + link + ">" + link + "</a>" 
          };

          newUser.email = email;
          newUser.password = newUser.generateHash(password);
          newUser.user = req.body.user;
          newUser.company = req.body.company;
          newUser.canSubmitAfter = 0;

          newUser.permalink = permalink;
          newUser.verificationToken = verificationToken;
          newUser.verified = false;

          newUser.save(function(err){
            if(err) {
              throw err;
            } else {
            // VerifyEmail.sendverification(email, verification_token, permalink);
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                  return done(err);
                    // return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

            return done(null, newUser, { message: 'You successfully signed up.' });
            }
          })
        }
      });
    });
  }));      
};
