var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var usuario = new Schema({
		nombre: String,
		foto: String,
		email: String,
		contrasena: String,
		pin: Number,
		status: String
	});

  usuario.methods.findByEmail = function findByEmail (cb) {
  	return this.model('USUARIO').find({ email: this.email },cb)
  };

	module.exports = mongoose.model('USUARIO', usuario);