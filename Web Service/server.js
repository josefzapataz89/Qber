var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/chat', function(err,res){
	if(err) console.log('ERROR: Conectando a la bd '+err);
	else console.log('Conexion a la BDrealizada');
});

function permitirCORS(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', "Content-Type, Accept");
	next();
}

app.configure(function() {
	//app.set("jsonp callback", true);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(permitirCORS);
	app.use(app.router);
	
});

app.get('/', function(req, res){
	res.send('Hola Mundo!');
});

require('./routes')(app);

app.listen(5000);
console.log('Servidor Express escuchando en el puerto 5000');