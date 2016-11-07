var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
// var cookieParser = require('cookie-parser')
require('./userConfig/passport.js')(passport);

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

var userControl = require('./controllers/userControl.js');

app.post('/login', userControl.login);
app.post('/signup', userControl.signup);
app.get('/logout', userControl.logout);
app.get('/user/:id', userControl.getUser);
app.get('/users', userControl.getAllUsers);
app.get('/oneUser', userControl.getOneUser);

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

mongoose.connect('mongodb://localhost:27017/react_login');
mongoose.connection.once('open', function(){ console.log('Connected to database'); });

app.get('/', function(req, res){
 res.send('index');
});

app.listen(7070, function(){
	console.log('server on 7070');
});



