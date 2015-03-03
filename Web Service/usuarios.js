var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var usuario = new Schema({
		nombre: String,
		numphone: Number,
		user: String
	});

	module.exports = mongoose.model('USUARIO', usuario);