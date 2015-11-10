var mongoose = require('mongoose');

var PetSchema = new mongoose.Schema({
	_id : String,
	name: String,
	species: String,
	breed: String,
	sex: String,
	size: String,
	declawed: String,
	location: String,
	intakeDate: { type: Date, default: Date.now},
	price: String,
	age: String,
	color: String,
	site: String,
	description: String,
	photo: String,
});

var Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;