var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var usuario = new Schema({
		nombre: String,
		foto: String,
		email: String,
		contrasena: String,
		pin: Number,
		status: String,
		
	});

	module.exports = mongoose.model('USUARIO', usuario);