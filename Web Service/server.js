var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/chat', function(err,res){
	if(err) console.log('ERROR: Conectando a la bd '+err);
	else console.log('Conexion a la BDrealizada');
});

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.get('/', function(req, res){
	res.send('Hola Mundo!');
});

require('./routes')(app);

app.listen(5000);
console.log('Servidor Express escuchando en el puerto 5000');