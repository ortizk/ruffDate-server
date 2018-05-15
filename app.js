require('dotenv').config();
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var expressJWT = require('express-jwt');
var logger = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

// Mongoose connect
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pupdate', {useMongoClient: true});

// Set up middleware
app.use(logger('dev'));
app.use(cors({
	origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true}));

// Controllers
app.use('/', require('./routes/zipApi'));
app.use('/', require('./routes/dog'));
app.use('/auth', expressJWT({
	secret: process.env.JWT_SECRET,
	getToken: function fromRequest(req){
		if(req.body.headers.Authorization && req.body.headers.Authorization.split(' ')[0] === 'Bearer'){
			return req.body.headers.Authorization.split(' ')[1];
		}
		return null;
	}
}).unless({
	path:[
	{ url: '/auth/login', methods: ['POST'] },
	{ url: '/auth/signup', methods: ['POST'] }
	]
}), require('./routes/auth'));


// module.exports = app;
app.listen(process.env.PORT || 3001)