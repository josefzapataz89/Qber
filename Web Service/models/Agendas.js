var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AGENDA = new Schema({
    propietario: String,
    contacto: String
});

module.exports = mongoose.model('Agenda', AGENDA);