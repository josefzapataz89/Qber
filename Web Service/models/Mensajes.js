var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CHATS = new Schema({
	status : Number,
    remitente: String,
    destinatario: String,
    mensaje: [{
		texto:String
    }],
    tiempo: String
});

module.exports = mongoose.model('Chat', CHATS);