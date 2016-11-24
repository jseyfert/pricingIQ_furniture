var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel.js');
var SendMail = require('./email.js');
var passport = require('passport'); //i dont think this needs to be here
var randomstring = require("randomstring");

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
			if(err){
				return done(err);
      }
			if(!user){
				return done(null, false, { message: 'We could not find your email address.' });
      }
			if(!user.validPassword(password)){
				return done(null, false, { message: 'Wrong password. Try again.'});
      }
      
      var allDomains = req.body.allDomains
      var currentTime = req.body.currentTime
      var resetCountAfter = user.resetCountAfter
      var resetCount = currentTime > resetCountAfter
      var newResetCountAfter = req.body.newResetCountAfter
      
      //reset count if its a new day
      if (resetCount){
        var countLeftToSubmit = allDomains.map(function(arr){ return [arr[0], 15]})
        user.countLeftToSubmit = countLeftToSubmit;
        user.resetCountAfter = newResetCountAfter  
        user.save(function(err) { // save the user
            if (err) {
              return done(err);
            } else {
              console.log('user done been updated');
              // res.json({ message: 'user updated!' });
            }
        });
      }

      //check for new domains if its the same day
      if (!resetCount){
        var countLeftToSubmit = user.countLeftToSubmit
        var allDomainsOnlyName = allDomains.map(function(arr){ return arr[0] })
        var userCountLeftToSubmitOnlyName = countLeftToSubmit.map(function(arr){ return arr[0] })
        var newDomains = allDomainsOnlyName.filter(function(arr) { return userCountLeftToSubmitOnlyName.indexOf(arr) == -1; });
        var addNewDomains = function(newDomains){
          newDomains.map(function(domain){
            countLeftToSubmit.push([domain, 15])
          })
        }(newDomains)

        user.countLeftToSubmit = countLeftToSubmit;
        user.save(function(err) { // save the user
            if (err) {
              return done(err);
            } else {
              console.log('countLeftToSubmit updated');
              // res.json({ message: 'user updated!' });
            }
        });
      }

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

          var allDomains = req.body.allDomains
          console.log('allDomains signup', allDomains);
          var countLeftToSubmit = allDomains.map(function(arr){ return [arr[0], 15]})
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
          
          newUser.canSubmitAfter = 0; // DELETE

          newUser.resetCountAfter = req.body.resetCountAfter;
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
