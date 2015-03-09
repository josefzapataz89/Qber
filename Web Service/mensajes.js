var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var msj = new Schema({
		emisor: String,
		receptor: String,
		mensaje: String,
		fecha_envio: Date()
	});

	module.exports = mongoose.model('MSJ', msj);