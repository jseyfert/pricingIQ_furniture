var mongoose = require('mongoose');
var Suggest = require('../models/suggest.js');
var Sequelize = require('sequelize')
var sequelize = new Sequelize(process.env.SQL_URI);


module.exports = {

  getCustomers: function(req, res){
    var Customer = sequelize.define('customers', {
      Name: {
        type: Sequelize.STRING
      },
      customerId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    }, {
      timestamps: false
    });
    
    Customer.findAll().then(function(customer) {
      res.json(customer)
    })
  },

  getDomains: function(req, res){
    var Site = sequelize.define('sites', {
      siteId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      siteName: {
        type: Sequelize.STRING
      },
      siteDomainUrl: {
        type: Sequelize.STRING
      },
    }, {
      timestamps: false
    });

    Site.findAll().then(function(site) {
      res.json(site)
    })
  },

  submitUrls: function(req, res){
    // console.log('######## SUBMIT URLS ########', req.body.urlsToSubmit);
    var InputQueue_discovery = sequelize.define('inputQueue_discovery', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
        SiteId: Sequelize.INTEGER,
        customerId: Sequelize.INTEGER,
        spiderName: Sequelize.TEXT,
        inputCategoryUrl: Sequelize.TEXT,
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'inputQueue_discovery'
    })  

    req.body.urlsToSubmit.map(function(item){
      InputQueue_discovery.create({
        SiteId: item.SiteId,
        customerId: item.customerId,
        spiderName: item.spiderName,
        inputCategoryUrl: item.inputCategoryUrl,
      });
    })

    res.json({
      activeComponent: 'orderComplete',
      // message: {message: "Order ID: " + order.dataValues.orderId , alert: null},
    })

    // ========

    // InputQueue_discovery3.sync({force: false}).then(function () {
    //   // Table created
    //  return InputQueue_discovery3.create({
    //     SiteId: 343,
    //     customerId: 434,
    //     spiderName: 'psider',
    //     inputCategoryUrl: 'url',
    //   });
    // });

  },








  // submitUrlsId: function(req, res){
  //   // console.log('######## SUBMIT URLS WITH ID ########', req.body.urlsToSubmit);

  //   user = req.body.user
  //   userId = req.body.user._id
  //   email = req.body.user.email
  //   urlsToSubmit = req.body.urlsToSubmit
  //   newCountLeftToSubmit = req.body.newCountLeftToSubmit
  //   // console.log('urlsToSubmit', urlsToSubmit, 'newCountLeftToSubmit', newCountLeftToSubmit);
   
  //   var Orders = sequelize.define('order', {
  //     orderId: {
  //       type: Sequelize.INTEGER,
  //       primaryKey: true,
  //       autoIncrement: true 
  //     },
  //       userId: Sequelize.TEXT,
  //       email: Sequelize.TEXT,
  //   })

  //   var Urls = sequelize.define('url', {
  //     urlId: {
  //       type: Sequelize.INTEGER,
  //       primaryKey: true,
  //       autoIncrement: true 
  //     },
  //       url: Sequelize.TEXT,
  //   })  // submitUrlsId: function(req, res){
  //   // console.log('######## SUBMIT URLS WITH ID ########', req.body.urlsToSubmit);

  //   user = req.body.user
  //   userId = req.body.user._id
  //   email = req.body.user.email
  //   urlsToSubmit = req.body.urlsToSubmit
  //   newCountLeftToSubmit = req.body.newCountLeftToSubmit
  //   // console.log('urlsToSubmit', urlsToSubmit, 'newCountLeftToSubmit', newCountLeftToSubmit);
   
  //   var Orders = sequelize.define('order', {
  //     orderId: {
  //       type: Sequelize.INTEGER,
  //       primaryKey: true,
  //       autoIncrement: true 
  //     },
  //       userId: Sequelize.TEXT,
  //       email: Sequelize.TEXT,
  //   })

  //   var Urls = sequelize.define('url', {
  //     urlId: {
  //       type: Sequelize.INTEGER,
  //       primaryKey: true,
  //       autoIncrement: true 
  //     },
  //       url: Sequelize.TEXT,
  //   })

  //   Urls.belongsTo(Orders, {foreignKey: 'orderId'});

  //   sequelize.sync().then(function () {
  //     Orders.create({
  //       userId: userId,
  //       email: email,
      // }).then(function(order){
      //   urlsToSubmit.map(function(url){
      //     Urls.create({
      //       orderId: order.dataValues.orderId,
      //       url: url,
      //     })
        // })
  //       if(user) {
  //         mongoose.model('User').findById({ _id: userId },
  //           function(err, user) {
  //             if (err) {
  //               // return console.log('in updateUser > mongoose > findById', err);
  //             } else {
  //               // console.log('countLeftToSubmit', user.countLeftToSubmit);
  //               user.countLeftToSubmit = newCountLeftToSubmit
  //               user.save(function(err) { 
  //                   if (err) {
  //                     res.send(err);
  //                   } else {
  //                     // console.log('success!!!!!!!!');
  //                     res.json({
  //                       user: user,
  //                       activeComponent: 'orderComplete',
  //                       message: {message: "Order ID: " + order.dataValues.orderId , alert: null},
  //                     })
  //                   }
  //               });
  //             }
  //           });
  //         } else {
  //           console.log("could not submit urls");
  //           res.json({ message: { message: "could not submit urls"} })
  //         }
  //     })
  //   })

  // },

  // submitUrlsNoId: function(req, res){

  //   // console.log('*/*/*/*/*/* submit urls witout id */*/*/*/*', req.fingerprint.components);
    
  //   var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  //   var userAgent = req.headers['user-agent']

  //   var fingerprintHash = req.fingerprint.hash
  //   var browserFamily = req.fingerprint.components.useragent.browser.family
  //   var browserVersion = req.fingerprint.components.useragent.browser.version
  //   var deviceFamily = req.fingerprint.components.useragent.device.family
  //   var deviceVersion = req.fingerprint.components.useragent.device.version
  //   var osFamily = req.fingerprint.components.useragent.os.family
  //   var osMajor = req.fingerprint.components.useragent.os.major
  //   var osMinor = req.fingerprint.components.useragent.os.minor
  //   var acceptHeadersAccept = req.fingerprint.components.acceptHeaders.accept
  //   var acceptHeadersEncoding = req.fingerprint.components.acceptHeaders.encoding
  //   var acceptHeadersLanguage = req.fingerprint.components.acceptHeaders.language
  //   var country = req.fingerprint.components.geoip.country
  //   var region = req.fingerprint.components.geoip.region
  //   var city = req.fingerprint.components.geoip.city


  //   urlsToSubmit = req.body.urlsToSubmit
  //   res.json({ activeComponent: 'login'})

  //   var Order_noUsers = sequelize.define('order_noUsers', {
  //     orderId: {
  //       type: Sequelize.INTEGER,
  //       primaryKey: true,
  //       autoIncrement: true 
  //     },
  //     ip: Sequelize.TEXT,
  //     userAgent: Sequelize.TEXT,
  //     fingerprintHash: Sequelize.TEXT,
  //     browserFamily: Sequelize.TEXT,
  //     browserVersion: Sequelize.TEXT,
  //     deviceFamily: Sequelize.TEXT,
  //     deviceVersion: Sequelize.TEXT,
  //     osFamily: Sequelize.TEXT,
  //     osMajor: Sequelize.TEXT,
  //     osMinor: Sequelize.TEXT,
  //     acceptHeadersAccept: Sequelize.TEXT,
  //     acceptHeadersEncoding: Sequelize.TEXT,
  //     acceptHeadersLanguage: Sequelize.TEXT,
  //     country: Sequelize.TEXT,
  //     region: Sequelize.TEXT,
  //     city: Sequelize.TEXT,
  //   })

  //   var Url_noUsers = sequelize.define('url_noUsers', {
  //     urlId: {
  //       type: Sequelize.INTEGER,
  //       primaryKey: true,
  //       autoIncrement: true 
  //     },
  //     url: Sequelize.TEXT,
  //   })

  //   Url_noUsers.belongsTo(Order_noUsers, {foreignKey: 'orderId'});

  //   sequelize.sync().then(function () {
  //     Order_noUsers.create({
  //       ip: ip,
  //       userAgent: userAgent,
  //       fingerprintHash: fingerprintHash,
  //       browserFamily: browserFamily,
  //       browserVersion: browserVersion,
  //       deviceFamily: deviceFamily,
  //       deviceVersion: deviceVersion,
  //       osFamily: osFamily,
  //       osMajor: osMajor,
  //       osMinor: osMinor,
  //       acceptHeadersAccept: acceptHeadersAccept,
  //       acceptHeadersEncoding: acceptHeadersEncoding,
  //       acceptHeadersLanguage: acceptHeadersLanguage,
  //       country: country,
  //       region: region,
  //       city: city,
  //     }).then(function(order){
  //       // console.log(order)
  //       urlsToSubmit.map(function(url){
  //         Url_noUsers.create({
  //           orderId: order.dataValues.orderId,
  //           url: url,
  //         })
  //       })
  //     })
  //   })
  // },

  // suggest: function(req, res){
  //   var arr = req.body.arr;
  //   // console.log('in server - these arr have been sent to the server\n', arr);
  //   // res.json({ message: {message: 'suggested domains sent to server'}})
    
  //   var newSuggest = new Suggest();
  //   newSuggest.suggest = arr

  //   newSuggest.save(function(err){
  //     if(err) {
  //       throw err;
  //     } else {
  //       res.json({ message: 'suggested domains sent to server'})
  //     }
  //   })
  // },



};

