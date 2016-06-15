var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/views'));


mongoose.connect('mongodb://localhost:27017/react_login');
mongoose.connection.once('open', function(){
	console.log('Lotus, you are connected to your database');
});


app.get('/', function(req, res){
	res.send('index.html');
});

app.listen(7070, function(){
	console.log('Lo your server is up and running successfully');
});


