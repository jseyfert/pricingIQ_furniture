var UserModel = require('../models/userModel.js');
var express = require('express');
var app = express();
var passport = require('passport');
var mongoose = require('mongoose');

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
  }

  ,

  updateUser: function(req, res){
    var newCanSubmitAfter = req.body.newCanSubmitAfter
    console.log('in update user SERVER SIDE1', req.body.newCanSubmitAfter);
    console.log('in update user SERVER SIDE2', req.user._id);
    // var midnight = new Date().setHours(23,59,59,0); // getting time on client side
    // console.log('in update user SERVER SIDE2', req.user.newCanSubmitAfter);
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
              user.canSubmitAfter = newCanSubmitAfter  // update canSubmitAfter with midnight tonight
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
	}

};


      // .put(function(req, res) {
      //     User.findById(req.params.user_id, function(err, user) {
      //         if (err)
      //             res.send(err);
              // user.name = req.body.name;  // update the users info
              // save the user
              // user.save(function(err) {
              //     if (err)
      //         //         res.send(err);
      //             res.json({ message: 'user updated!' });
      //         });

      //     });
      // })