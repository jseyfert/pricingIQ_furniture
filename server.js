var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


var app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/views'));




app.get('/', function(req, res){
	res.send('index.html');
});

app.listen(7070, function(){
	console.log('Server up and running successfully')
});


