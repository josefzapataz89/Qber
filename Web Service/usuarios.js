var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var usuario = new Schema({
		nombre: String,
		apellido: String,
		email: String,
		contrasena: String,
		pin: Number
	});

	module.exports = mongoose.model('USUARIO', usuario);