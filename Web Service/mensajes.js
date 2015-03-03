var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var msj = new Schema({
		emisor_num: Number,
		receptor_num: Number,
		mensaje: String,
		fecha_envio: Date()
	});

	module.exports = mongoose.model('MSJ', msj);