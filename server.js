var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
require('./userConfig/passport.js')(passport);

var app = express();

//mounting all of your middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/views'));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(session({
 cookie: {
   maxAge: 60000
 }
}));

var userControl = require('./controllers/userControl.js');

app.post('/login', userControl.login);
app.post('/signup', userControl.signup);
app.get('/logout', userControl.logout);
app.get('/user/:id', userControl.getUser);
app.get('/users', userControl.getAllUsers);





mongoose.connect('mongodb://localhost:27017/react_login');
mongoose.connection.once('open', function(){
	console.log('Lotus, you are connected to your database');
});

app.get('/', function(req, res){
	res.send('index');
});

app.listen(7070, function(){
	console.log('Lo your server is up and running successfully');
});


