var express 		= require('express');
var request 		= require('request');
var router 			= express.Router();
var UserDb			= require('../models/User');
require('dotenv').config();


var SECRET_KEY = process.env.SECRET_KEY;
var GSECRET_KEY = process.env.GSECRET_KEY;


// var matches;
//-----FIND ALL THE ZIPS WITHIN 5 MILE RADIUS OF USER ZIP
router.post('/getdogsnearby', function(req, res){
	var zip = req.body.zip;
	console.log("this is coming from router", zip);
	request(`https://www.zipcodeapi.com/rest/${SECRET_KEY}/radius.json/${zip}/5/miles?minimal`
	,function(err, resp, body){
	console.log('request was made');
// -----MAKE DB CALL TO FIND USERS WITH ZIPS FROM SEARCH
	let zipResults = JSON.parse(body);
	console.log(zipResults)
	UserDb.find({zip: {$in:zipResults.zip_codes}})
	.populate('dogs')
	.exec(function(err, matchedUsers){
		console.log('matched users', matchedUsers);
		// matches = match;
		res.json(matchedUsers)
	})
	.catch(err => {
		console.log('error happened', err);
	})
	// console.log(matches);
	// console.log('err', err)
	// console.log('body', body)
	// res.send('temporary stub from zipapi.js');
	});
});

//-----GEOCODING API TO GET LONG AND LAT

//need to access the address the user inputted at signup


//convert that into a string that url understands
// replace the following address with the user gotten from the db
// var userInfo = { 
//     address: '123 fake st',
//     city: 'Seattle Way',
//     state: 'WA'
// };
// let address = userInfo.address;
// let city = userInfo.city;
// let noSpaceAddress = address.split(' ').join('+');
// let noSpaceCity = city.split(' ').join('+');
// let state = userInfo.state;

// console.log(`${noSpaceAddress},+${noSpaceCity},+${state}`);

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${GSECRET_KEY}



module.exports = router;
