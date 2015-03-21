var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CHATS = new Schema({
    remitente: String,
    destinatario: String,
    mensaje: String,
    tiempo: String
});

module.exports = mongoose.model('Chat', CHATS);