require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');
var bcrypt = require('bcrypt');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res) {
  console.log('/auth/login post route', req.body);

  // Find out if the user exists (for login, they should)
  User.findOne({ email: req.body.email }).populate('dogs')
  .then(function(user){
  	if(!user || !user.password){
  		return res.status(403).send('User not found');
  		// this will show up as a console log on login err
  	}

  	//The user exists. Now, we want to validate the password
  	if(!user.authenticated(req.body.password)){
  		// User is invalid
  		return res.status(401).send('Invalid Credentials')
  	}

  	//The user is valid!!!
  	var token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
  		expiresIn: 60 * 60 *24
  	});

  	//Send that token and the user info
  	res.send({ user: user, token: token })
  })
  .catch(function(err){
  	console.log('error was ', err);
  	return res.status(503).send('Database Error. :(')
  });
});

// POST /auth/signup route - create a user in the DB and then log them in
router.post('/signup', function(req, res) {
  console.log('/auth/signup post route', req.body);
  //TODO: First check if the user already exists
  User.findOne({ email: req.body.email }).populate('dogs')
  .then(function(user){
  	//Database call was a success 
  	if(user){
  		// if the user exists already don't let them create a duplicate account. They should instead log in
  		return res.status(400).send('User exists already!');
  	}

  	//Great! This is a new user. Let's make them an account.
  	User.create(req.body)
  	// if the fields are named something else you have to specifiy
  	.then(function(createdUser){
  		// Make a token and send it as JSON, so the user can remain logged in
  		var token = jwt.sign(createdUser.toJSON(), process.env.JWT_SECRET, {
  			expiresIn: 60 * 60 * 24 // 24 hours, in seconds
  		});
  		res.send({ user: createdUser, token: token })
  	})
  	.catch(function(err){
  		console.log('err', err);
  		res.status(500).send('Could not create user in DB')
  	})
  })
  .catch(function(err){
  	console.log('err', err);
  	res.status(500).send("Database Error! :(")
  });
});

// This is checked on a browser refresh
router.post('/me/from/token', function(req, res) {
  console.log('find user from token', req.body);
  res.send({ user: req.user });
});


module.exports = router;

