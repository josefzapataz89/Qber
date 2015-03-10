var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var msj = new Schema({
		emisor: String,
		receptor: String,
		mensaje: String
	});

	module.exports = mongoose.model('MSJ', msj);