var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Usuario = require('./models/Usuarios.js');

mongoose.connect('mongodb://localhost/chat', function(err, res){
	if(err)
		console.log('Error: no se pudo conectar con la Base de Datos');
	else
		console.log('Conexión con la Base de datos exitosa');
});

function permitirCORS(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', "origin, X-Requested-With, content-type, accept");
	next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(permitirCORS);

var port = process.env.PORT || 5000;

var router = express.Router();

router.get('/', function(req, res){
	res.json({ message: 'Bienvenido a la API'});
});

router.route('/usuarios')
	.post(function(req, res){

		var user = new Usuario();
		user.nombre = req.body.nombre;
		user.foto = req.body.foto;
		user.email = req.body.email;
		user.contrasena = req.body.contrasena;
		user.pin = req.body.pin;
		user.estado = req.body.estado;

		user.save(function(err){
			if(err)
				res.send(err);
			console.log(user);
			res.json({ message: 'Usuario Registrado'});
			res.json(user);
		});

	})
	.get(function(req, res){
		Usuario.find(function(err, Usuarios){
			if(err)
				res.send(err);
			res.json(Usuarios);
		});
	});

app.use('/api', router);

app.listen(port);
console.log('Conexión establecida por el puerto '+port);
