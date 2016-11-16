var UserModel = require('../models/userModel.js');
var express = require('express');
var app = express();
var passport = require('passport');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var randomstring = require("randomstring");
var transporter = nodemailer.createTransport('smtps://johnseyfertfake%40gmail.com:1982johnfake@smtp.gmail.com');

module.exports = {
	
  login: function(req, res, next){
			//console.log(req.body);
		passport.authenticate('local-login', function(err, user, info){
			//console.log('You logged in.', info);
			if(err) { return next(err); }
			if(!user) { return res.status(404).json(info.message) }
			req.login(user, function(err){
				if(err) { return next(err); }
				return res.json({ 
          // message: 'You logged in',
           user: user });
			});	
		})(req, res, next);
	},

	signup: function(req, res, next){
		passport.authenticate('local-signup', function(err, user, info){
			// console.log('You signed up.', info);
			if(err) { return next(err); }
			if(!user) { return res.status(404).json(info.message); }
			req.login(user, function(err){
				if(err) { return next(err); }
				return res.json({ 
          // message: 'You signed up',
           user: user });
			})
		})(req, res, next);
	},

	logout: function(req, res){
		req.logout();
		res.json({ message: 'You logged out' });
	},

	getUser: function(req, res){
			UserModel.findById(req.params.id, function(err, user){
				if(err){
					console.log(err);
					res.send(err);
				} else {
					res.json(user);
				}
			})	
	},

	getAllUsers: function(req, res){
		UserModel.find().exec(function(err, result){
			if(err){
				res.send(err);
			} else {
				res.send(result);
			}
		})
	},

  getOneUser: function(req, res){
    if(req.user) {
        // console.log(req.user)
        mongoose.model('User').findById({
            _id: req.user._id
          },
          function(err, user) {
            if (err) {
                return console.log(err);
            } else {
                res.json(user)
            }
          });
      } else {
        res.json({
            user: "anonymous"
        })
      }
  },

  updateUser: function(req, res){
    var canSubmitAfter = req.body.canSubmitAfter
    // console.log('in update user SERVER SIDE1', req.body.canSubmitAfter);
    // console.log('in update user SERVER SIDE2', req.user._id);
    // var midnight = new Date().setHours(23,59,59,0); // getting time on client side
    // console.log('in update user SERVER SIDE2', req.user.canSubmitAfter);
    // console.log('in update user SERVER SIDE1', req.body);
		if(req.user) {
     		// console.log('in req.user', req.user)
     		mongoose.model('User').findById({
         		_id: req.user._id
       		},
       		function(err, user) {
         		if (err) {
           		return console.log('in updateUser > mongoose > findById', err);
         		} else {
              user.canSubmitAfter = canSubmitAfter  // update canSubmitAfter with midnight tonight
              user.save(function(err) { // save the user
                  if (err) {
                    // console.log('in updateUser > mongoose > findById > save user with new info', err);
                    res.send(err);
                  } else {
                    // res.json({ message: 'user updated!' });
           		      res.json(user)
                  }
              });
         		}
       		});
   		} else {
     		res.json({
       			message: "could not update user"
     		})
   		}
	},

  verify: function(req, res){
      var permalink = req.params.permalink;
      var token = req.params.token;

      UserModel.findOne({'permalink': permalink}, function (err, user) {
          if(err){
            return console.log('error', err);
          } else if (user){
            if (user.verificationToken == token) {
                UserModel.findOneAndUpdate({'permalink': permalink}, {'verified': true}, function (err, resp) {
                    console.log('The user has been verified!');
                });
                // res.redirect('/confirmed');
                res.send('<div><strong>Success!</strong> You have confirmed your email - Please close this window</div>');
                // res.json({message: 'The user has been verified'})
            } else {
                console.log('The token is wrong - User not verified');
                res.json({message: 'The token is wrong - User not verified'})
            }
          } else {
              console.log('The token is wrong - User not verified');
              res.json({message: 'The permalink is wrong - User not verified'})

          }

      }); 
  },

  forgot: function(req, res){
    var email = req.body.user.email;
    var permalink = email.toLowerCase().replace(' ', '').replace(/[^\w\s]/gi, '').trim();
    var resetToken = randomstring.generate({ length: 64 });
    var passwordResetExpires = Date.now() + 3600000; // 1 hour

    var link = "http://localhost:7070" + "/reset/" + permalink + "/" + resetToken;

    var mailOptions = {
      from: '"pricingIQ" <johnseyfert@gmail.com>', // sender address 
      to: email, // list of receivers 
      subject: 'Reset Your Password ✔', // Subject line 
      text: 'please use html format', // plaintext body 
      html : "Please Click the link to reset your password.<br><a href=" + link + ">" + link + "</a>" 
    };

      UserModel.findOne({email: email}, function (err, user) {

        if (err) { 
          return done(err); 
        }

        if (!user) {
          res.json({message: 'Account with that email address does not exist.' })
        }

        if (user) {
          user.passwordResetToken = resetToken;
          user.passwordResetExpires = passwordResetExpires;
          user.save((err) => {
            res.json({message: 'reset token has been saved' })
            // done(err, resetToken, user);
          });

          transporter.sendMail(mailOptions, function(error, info){
              if(error){
                console.log('userControls > forgot > sendmail',error);
                return done(error);
              }
              console.log('Message sent: ' + info.response);
          });
        }
      }); 
  },


};

