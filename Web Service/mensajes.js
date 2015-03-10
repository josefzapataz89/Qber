var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	var msj = new Schema({
		emisor: String,
		receptor: String,
		mensaje: String
	});


  msj.methods.findByEmisor = function findByEmisor (cb) {
  	return this.model('MSJ').find({ emisor: this.emisor },cb)
  };

  msj.methods.findByReceptor = function findByReceptor (cb) {
  	return this.model('MSJ').find({ receptor: this.receptor },cb)
  };


	module.exports = mongoose.model('MSJ', msj);