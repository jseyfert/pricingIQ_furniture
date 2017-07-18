var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var Sequelize = require('sequelize')
var Fingerprint = require('express-fingerprint');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

require('dotenv').config();
require('./config/passport.js')(passport);

var app = express();
app.use(cors());

app.use(bodyParser.json({limit: '50mb', parameterLimit: 1000000}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

app.use(express.static(__dirname + '/views'));

app.use(Fingerprint({
    paramters:[
        Fingerprint.useragent,
        Fingerprint.acceptHeaders,
        Fingerprint.geoip,
    ]
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 2629800000 }, // 1 month
  store: new FileStore,
  // store: new MongoStore,
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

// app.post('/suggest', data.suggest);
// app.post('/submitUrlsId', data.submitUrlsId);
// app.post('/submitUrlsNoId', data.submitUrlsNoId);

app.get('/getDomains', data.getDomains);
app.get('/getCustomers', data.getCustomers);
app.post('/getSubmitedUrls', data.getSubmitedUrls);
app.post('/submitUrls', data.submitUrls);
app.post('/deleteUrls', data.deleteUrls);


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

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', function(){ console.log('Connected to database'); });


app.get('/', function(req, res){
 res.send('index');
  // if (req.user) {
  //     console.log('server.js > logged in');
  // } else {
  //     console.log('server.js > NOT logged in');
  // }
});

app.listen(process.env.PORT, function(){
	console.log('server on ' + process.env.PORT);
});



