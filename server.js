var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var Sequelize = require('sequelize')
// var cookieParser = require('cookie-parser')
require('dotenv').config();
require('./config/passport.js')(passport);

var app = express();
 
//mounting all of your middleware
// app.use(cookieParser())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/views'));
app.use(session({ secret: 'thisIsPricingIQ' }));  
app.use(session({
 cookie: {
  maxAge: 60000  // 30 days  //60 * 60 * 24 * 1 // = 1 day
 }
}));
app.use(passport.initialize());
app.use(passport.session()); 

var user = require('./controllers/user.js');
var data = require('./controllers/data.js');

app.post('/login', user.login);
app.post('/signup', user.signup);
app.get( '/logout', user.logout);
app.get( '/user/:id', user.getUser);
app.get( '/users', user.getAllUsers);
app.get( '/oneUser', user.getOneUser);
app.get( '/verifyEmail/:permalink/:emailVerificationToken', user.verifyEmail);
app.post('/forgotPassword', user.forgotPassword);
app.put( '/forgotPasswordResend', user.forgotPasswordResend); 
app.put( '/emailVerificationResend', user.emailVerificationResend); 
app.get( '/verifyPasswordReset/:passwordResetToken', user.verifyPasswordReset);
app.put( '/resetPassword', user.resetPassword);

app.post('/suggest', data.suggest);
app.post('/submitUrlsId', data.submitUrlsId);
app.post('/submitUrlsNoId', data.submitUrlsNoId);



if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');

  app.use('/static', express.static('static'));
} else {
  // When not in production, enable hot reloading

  var chokidar = require('chokidar');
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.dev');
  var compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  var watcher = chokidar.watch('./server');
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log('Clearing /server/ module cache from server');
      Object.keys(require.cache).forEach(function(id) {
        if (/\/server\//.test(id)) delete require.cache[id];
      });
    });
  });
}

mongoose.connect('mongodb://localhost:27017/pricingIQ');
mongoose.connection.once('open', function(){ console.log('Connected to database'); });

var sequelize = new Sequelize('mssql://appUser:appUser@54.70.87.41:1433/pricingIQ');

// var Order_noUsers = sequelize.define('order_noUsers', {
//   orderId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true 
//   }
// })

// var Url_noUsers = sequelize.define('url_noUsers', {
//   urlId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true 
//   },
//     url: Sequelize.TEXT,
// })

// Url_noUsers.belongsTo(Order_noUsers, {foreignKey: 'orderId'});

// sequelize.sync().then(function () {
//   Order_noUsers.create({
//     // userId: 'userId',
//     // email: 'email',
//   }).then(function(order){
//     console.log(order)
//     Url_noUsers.create({
//       orderId: order.dataValues.orderId,
//       url: 'url1',
//     })
//     Url_noUsers.create({
//       orderId: order.dataValues.orderId,
//       url: 'url2',
//     })
//     Url_noUsers.create({
//       orderId: order.dataValues.orderId,
//       url: 'url3',
//     })
//   })
// })


app.get('/', function(req, res){
 res.send('index');
  // if (req.user) {
  //     console.log('server.js > logged in');
  // } else {
  //     console.log('server.js > NOT logged in');
  // }
});


app.listen(7070, function(){
	console.log('server on 7070');
});



