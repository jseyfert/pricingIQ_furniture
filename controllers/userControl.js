var UserModel = require('../models/userModel.js');
var SendMail = require('../userConfig/email.js');
var express = require('express');
var app = express();
var passport = require('passport');
var mongoose = require('mongoose');
var randomstring = require("randomstring");


module.exports = {
	
  login: function(req, res, next){
		passport.authenticate('local-login', function(err, user, info){
			if(err) { return next(err); }
			if(!user) { return res.status(404).json(info.message) }
			req.login(user, function(err){
				if(err) { return next(err); }
				return res.json({ user: user });
			});	
		})(req, res, next);
	},

	signup: function(req, res, next){
		passport.authenticate('local-signup', function(err, user, info){
			if(err) { return next(err); }
			if(!user) { return res.status(404).json(info); }
			req.login(user, function(err){
				if(err) { return next(err); }
				return res.json({ user: user });
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
      var htmlSuccess = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body cz-shortcut-listen="true"><div style="margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;"><div style="background-color: #f2f2f2; padding: 45px;"><div style="background-color: #ffffff; padding: 40px; text-align: center;"><h1 style="color: #5f5f5f; margin-bottom: 30px;">Congratulations, </h1><p style="color: #5f5f5f; line-height: 22px;">You have successfully verified your email, now please close this tab.</p></div> <h3 style="color: #5f5f5f; text-align: center; margin-top: 30px;">pricingIQ</h3></div></div></body></html>'
      var htmlTokenExpired = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body cz-shortcut-listen="true"><div style="margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;"><div style="background-color: #f2f2f2; padding: 45px;"><div style="background-color: #ffffff; padding: 40px; text-align: center;"><h1 style="color: #5f5f5f; margin-bottom: 30px;">Sorry, </h1><p style="color: #5f5f5f; line-height: 22px;">This token is expired, please request a new one.</p></div> <h3 style="color: #5f5f5f; text-align: center; margin-top: 30px;">pricingIQ</h3></div></div></body></html>'
      var htmlTokenIncorrect = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body cz-shortcut-listen="true"><div style="margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;"><div style="background-color: #f2f2f2; padding: 45px;"><div style="background-color: #ffffff; padding: 40px; text-align: center;"><h1 style="color: #5f5f5f; margin-bottom: 30px;">Sorry, </h1><p style="color: #5f5f5f; line-height: 22px;">This token is incorrect, please request a new one.</p></div> <h3 style="color: #5f5f5f; text-align: center; margin-top: 30px;">pricingIQ</h3></div></div></body></html>'


      UserModel.findOne({'permalink': permalink}, function (err, user) {
          if(err){
            return console.log('error', err);
          } else if (user){
            if (user.verificationToken == token) {
                UserModel.findOneAndUpdate({'permalink': permalink}, {'verified': true}, function (err, resp) {
                });
                res.send(htmlSuccess);
            } else {
                res.send(htmlTokenIncorrect);
            }
          } else {
              res.send(htmlTokenExpired);

          }

      }); 
  },

  forgot: function(req, res){
    var email = req.body.user.email;
    var resetToken = randomstring.generate({ length: 64 });
    var passwordResetExpires = Date.now() + 3600000; // 1 hour


      UserModel.findOne({email: email}, function (err, user) {

        if (err) { 
          return done(err); 
        }

        if (!user) {
          res.json({
            valid: false,
            message: {message: 'Account with that email address does not exist.', alert: 'alert alert-danger'},
          })
        }

        if (user) {
          user.passwordResetToken = resetToken;
          user.passwordResetExpires = passwordResetExpires;
          user.save((err) => {
            res.json({
              // userEmail: user.email,
              valid: true,
              message: {message: 'Please check your email to recieve you token' , alert: 'alert alert-info'},
            })
          });

          SendMail(email, null, resetToken)

        }
      }); 
  },

  verifyReset: function(req, res){
      var passwordResetToken = req.params.token;
      // console.log('SERVER > userControl > reset', passwordResetToken);

      UserModel.findOne({'passwordResetToken': passwordResetToken}, function (err, user) {
          if(err){
            return console.log('error', err);
          } else if (user){
            if (user.passwordResetExpires > Date.now()) {
              console.log('password is ready to be updated');
              res.json({
                message: {message: 'password is ready to be updated', alert: 'alert alert-success'},
                activeComponent: 'resetPassword',
                passwordResetToken: passwordResetToken
              })
            } else {
              console.log('The token is expired');
              res.json({
                message: {message: 'The token is expired - click here to resend', alert: 'alert alert-danger'},
                activeComponent: 'resetToken'
              })
            }
          } else {
              console.log('The token is wrong');
              res.json({
                message: {message: 'The token is wrong', alert: 'alert alert-danger'},
                activeComponent: 'resetToken',
              })
          }
      }); 
  },

  reset: function(req, res){
    var password = req.body.password;
    var passwordResetToken = req.body.passwordResetToken;
    
    UserModel.findOne({'passwordResetToken': passwordResetToken}, function (err, user) {
        if(err){
          return console.log('error', err);
        } else if (user){
          if (user.passwordResetExpires > Date.now()) {

            user.password = user.generateHash(password);
            user.passwordResetToken = null;
            user.passwordResetExpires = null;
            
            user.save((err) => {
              res.json({
                valid: true,
                message: {message: 'Success! Your password has been changed.', alert: "alert alert-success"},
                activeComponent: 'login',
              })
            });

            SendMail(user.email, null, null)

          } else {
            console.log('The token is expired');
            res.json({
              valid: false,
              message: {message: 'The token is expired - click here to resend', alert: "alert alert-danger"},
              activeComponent: 'resetPassword'
            })
          }
        } else {
            console.log('The token is wrong');
            res.json({
              valid: false,
              message: {message:'The token is wrong', alert: "alert alert-danger"},
              activeComponent: 'resetPassword',
            })
        }
    }); 
  },

  verifyResend: function(req, res){
    var email = req.body.user.email;
    console.log('in server verifyResend', email);

    UserModel.findOne({ email: email }, function(err, user){
      if(err)
        return done(err);
      if(user) {

        var permalink = email.toLowerCase().replace(' ', '').replace(/[^\w\s]/gi, '').trim();
        var verificationToken = randomstring.generate({ length: 64 });
        var link = "http://localhost:7070" + "/verify/" + permalink + "/" + verificationToken;

        user.permalink = permalink;
        user.verificationToken = verificationToken;
        user.verified = false;

        user.save(function(err){
          if(err) {
            throw err;
          } else {
            SendMail(email, link, null)
            res.json({
              message: {message: 'New email verification sent', alert: "alert alert-success"},
              // activeComponent: 'login',
            })
          }
        })
      } else {
          
          res.json({
            message: {message: 'Could not find user', alert: "alert alert-danger"},
            // activeComponent: 'login',
          })

      }
    });
  },

};

