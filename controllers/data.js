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

  getSubmitedUrls: function(req, res){
    console.log("req.body", req.body)
    var customerIdDashboard = req.body.customerIdDashboard
    var urlTypeDashboard = req.body.urlTypeDashboard

    var InputQueue_discovery = sequelize.define('inputQueue_discovery', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
        SiteId: Sequelize.INTEGER,
        customerId: Sequelize.INTEGER,
        urlType: Sequelize.TEXT,
        spiderName: Sequelize.TEXT,
        inputCategoryUrl: Sequelize.TEXT,
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'inputQueue_discovery'
    })  

    InputQueue_discovery.findAll({
    where: {
      urlType: urlTypeDashboard,
      customerId: customerIdDashboard,
    }
    }).then(function(urls) {
      res.json(urls)
    })
  },

  deleteUrls: function(req, res){
    var urlsToDelete = req.body.urlsToDelete
    // console.log("deleteUrls", urlsToDelete)

    // DISSABLE WHEN TESTING vvvv
    var InputQueue_discovery = sequelize.define('inputQueue_discovery', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
        SiteId: Sequelize.INTEGER,
        customerId: Sequelize.INTEGER,
        urlType: Sequelize.TEXT,
        spiderName: Sequelize.TEXT,
        inputCategoryUrl: Sequelize.TEXT,
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'inputQueue_discovery'
    })  

    InputQueue_discovery.destroy({
    where: {
      id: urlsToDelete
    }
    }).then(function(deleteCount) {
      res.json({deleteCount: deleteCount, activeComponent: 'deleteComplete', })
      console.log("deleteCount",deleteCount)
    })
    // DISSABLE WHEN TESTING ^^^^

  },

  submitUrls: function(req, res){
    // console.log('######## SUBMIT URLS ########', req.body.urlsToSubmit);
    
    // DISSABLE WHEN TESTING vvvv

    var InputQueue_discovery = sequelize.define('inputQueue_discovery', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
        SiteId: Sequelize.INTEGER,
        customerId: Sequelize.INTEGER,
        urlType: Sequelize.TEXT,
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
        urlType: item.urlType,
        spiderName: item.spiderName,
        inputCategoryUrl: item.inputCategoryUrl,
      });
    })
    
    // DISSABLE WHEN TESTING ^^^^

    res.json({
      activeComponent: 'orderComplete',
    })
  },

};

