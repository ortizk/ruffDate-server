var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var dogDb = require('../models/Dogs');
var UserDb = require('../models/User');
var multer = require('multer');
var upload = multer();
var cloudinary = require('cloudinary').v2;
require('dotenv').config();




// -----CREATING DOG IN THE DB
router.post('/profile', upload.single('img'), function(req, res){
	cloudinary.uploader.upload_stream({ resource_type: 'raw' }, function(error, result) {
		if(error){
			console.log(error);
			return res.send('OOPS, BAD PIC');
		}

		// Add the new url from cloudinary to req.body so we can add it to the new dog
		req.body.img = result.secure_url;

		// -----CREATING NEW DOG AND GETTING THAT NEW DOGS' ID
		dogDb.create(req.body, function(err, savedDog){
			// -----ADDING DOG ID TO USER DB ---userBe userBackEnd
			UserDb.findById(req.body.userId, (err, userParam) => {
				if(err){
					console.log(err);
				} 
				else {
					userParam.dogs.push(savedDog._id);
					userParam.save().then(userSaved => {
						console.log('user was saved');
						res.json(savedDog);
					});
				};
			});
		});
	}).end(req.file.buffer);
});

//-----RESPONDING TO REFETCHDATA FROM APP.JS, GETS DOG LIST WITH NEWLY CREATED DOGS.
router.get('/profile/:userId', function(req, res) {
  	UserDb.findById(req.params.userId)
  	.populate('dogs')
  	.exec((err, userParam) => {
		if(err){
			console.log(err);
		} 

		let dogs = userParam.dogs;
		console.log('dogs', dogs);
		res.json({user: userParam, dogs: userParam.dogs});

	});
});

// ----- DELETING A DOG 
router.delete('/profile', function(req, res){
	UserDb.findById(req.params.userId, (err, user) => {
		let i = user.dogs.indexOf(req.params.id);
		user.dogs.splice(i, 1);
		user.save();
		console.log(user.dogs);
		res.send('deleted dog')
	})

})



module.exports = router;

