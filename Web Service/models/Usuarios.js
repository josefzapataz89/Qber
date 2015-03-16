var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var USUARIOS = new Schema({
	nombre: String,
	foto: String,
	email: String,
	contrasena: String,
	pin: Number,
	estado: String
});

module.exports = mongoose.model('Usuario', USUARIOS);