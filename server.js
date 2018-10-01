//express server module
var express = require('express');
//application, running express app
var app = express();
//body parse for requests
var bodyParser = require('body-parser');
//mongodb setup
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop');


//enable body parser
app.use(bodyParser.json()); //want to use json, parses for json
app.use(bodyParser.urlencoded({extended: false})); //shallow parsing (false)

//enable CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', (request,response) => {

});


const PORT = process.env.PORT || 8080;

//listen to requests on port
app.listen({PORT});