var mongoose = require('mongoose'),
Schema = mongoose.Schema;

	var contact = new Schema({
		propiertario: String,
		nombre: String,
		foto: String,
		email: String, 
		status: String,
		
	});

	module.exports = mongoose.model('CONTACTOS', contact);