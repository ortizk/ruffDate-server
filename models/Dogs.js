var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DogSchema = new Schema({
	dogName: String,
	breed: String,
	temperament: String,
	age: Number,
	size: String
});

module.exports = mongoose.model('Dogs', DogSchema);
