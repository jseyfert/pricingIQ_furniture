var mongoose = require('mongoose');
var Suggest = require('../models/suggest.js');
var Sequelize = require('sequelize')
var sequelize = new Sequelize('mssql://appUser:appUser@54.70.87.41:1433/pricingIQ');

module.exports = {

  submitUrlsId: function(req, res){
    // console.log('######## SUBMIT URLS WITH ID ########', req.body.urlsToSubmit);

    user = req.body.user
    userId = req.body.user._id
    email = req.body.user.email
    urlsToSubmit = req.body.urlsToSubmit
    newCountLeftToSubmit = req.body.newCountLeftToSubmit
    // console.log('urlsToSubmit', urlsToSubmit, 'newCountLeftToSubmit', newCountLeftToSubmit);
   
    var Orders = sequelize.define('order', {
      orderId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
        userId: Sequelize.TEXT,
        email: Sequelize.TEXT,
    })

    var Urls = sequelize.define('url', {
      urlId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
        url: Sequelize.TEXT,
    })

    Urls.belongsTo(Orders, {foreignKey: 'orderId'});

    sequelize.sync().then(function () {
      Orders.create({
        userId: userId,
        email: email,
      }).then(function(order){
        urlsToSubmit.map(function(url){
          Urls.create({
            orderId: order.dataValues.orderId,
            url: url,
          })
        })
        if(user) {
          mongoose.model('User').findById({ _id: userId },
            function(err, user) {
              if (err) {
                // return console.log('in updateUser > mongoose > findById', err);
              } else {
                // console.log('countLeftToSubmit', user.countLeftToSubmit);
                user.countLeftToSubmit = newCountLeftToSubmit
                user.save(function(err) { 
                    if (err) {
                      res.send(err);
                    } else {
                      // console.log('success!!!!!!!!');
                      res.json({
                        user: user,
                        activeComponent: 'displayUrls',
                        message: {message: "Order ID: " + order.dataValues.orderId , alert: null},
                      })
                    }
                });
              }
            });
          } else {
            console.log("could not submit urls");
            res.json({ message: { message: "could not submit urls"} })
          }
      })
    })

  },

  submitUrlsNoId: function(req, res){
    // console.log('*/*/*/*/*/* submit urls witout id */*/*/*/*', req);
    urlsToSubmit = req.body.urlsToSubmit
    res.json({ activeComponent: 'login' })

    var Order_noUsers = sequelize.define('order_noUsers', {
      orderId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      }
    })

    var Url_noUsers = sequelize.define('url_noUsers', {
      urlId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
        url: Sequelize.TEXT,
    })

    Url_noUsers.belongsTo(Order_noUsers, {foreignKey: 'orderId'});

    sequelize.sync().then(function () {
      Order_noUsers.create({
        // userId: 'userId',
        // email: 'email',
      }).then(function(order){
        // console.log(order)
        urlsToSubmit.map(function(url){
          Url_noUsers.create({
            orderId: order.dataValues.orderId,
            url: url,
          })
        })
      })
    })
  },

  suggest: function(req, res){
    var arr = req.body.arr;
    // console.log('in server - these arr have been sent to the server\n', arr);
    // res.json({ message: {message: 'suggested domains sent to server'}})
    
    var newSuggest = new Suggest();
    newSuggest.suggest = arr

    newSuggest.save(function(err){
      if(err) {
        throw err;
      } else {
        res.json({ message: 'suggested domains sent to server'})
      }
    })
  },

};

