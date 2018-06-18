var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var dogDb = require('../models/Dogs');
var UserDb = require('../models/User');



// -----CREATING DOG IN THE DB
router.post('/profile', function(req, res){
	// -----CREATING NEW DOG AND GETTING THAT NEW DOGS' ID
	dogDb.create(req.body.dog, function(err, dog){
		var newDogId = dog._id
		// -----ADDING DOG ID TO USER DB ---userBe userBackEnd
		var userBe = req.body.user;
		UserDb.findById(userBe.id, (err, userParam) => {
			if(err){
				console.log(err);
			} 
			else {
				userParam.dogs.push(newDogId);
				userParam.save().then(userSaved => {
					console.log('user was saved');
					res.json(userSaved.dogs);
				});
			};
			
	});
	});



});
//-----RESPONDING TO REFETCHDATA FROM APP.JS, GETS DOG LIST WITH NEWLY CREATED DOGS.
router.get('/profile/:userId', function(req, res) {
	console.log(req.params.userId);
  	UserDb.findById(req.params.userId)
  	.populate('dogs')
  	.exec((err, userParam) => {
		if(err){
			console.log(err);
		} 
		else {
			console.log("this is the userParam: ", userParam) ;
		}

		let dogs = userParam.dogs;
		console.log('dogs', dogs);
		res.json({user: userParam, dogs: userParam.dogs});

	});
});

// ----- DELETING A DOG 
router.delete('/profile', function(req.res){
	UserDb.findById(req.params.userId, (err, user) => {
		let i = user.dogs.indexOf(req.params.id);
		user.dogs.splice(i, 1);
		user.save();
		console.log(user.dogs);
		res.send('deleted dog')
	})

})



module.exports = router;

