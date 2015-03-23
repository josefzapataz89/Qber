var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AGENDA = new Schema({
    propietario: String,
    nombre: String,
    foto: String,
    correo: String,
    estado: String
});

module.exports = mongoose.model('Agenda', AGENDA);