var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Usuario = require('./models/Usuarios.js');
var Chat = require('./models/Mensajes.js');
var Agenda = require('./models/Agendas.js');

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
			//res.json({ message: 'Usuario Registrado'});
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
router.route('/usuarios/:correo')
	.get(function(req, res){
		Usuario.findOne({'email': req.params.correo}, function(err, user){
			if(err)
				res.send(err);
			res.json(user);
		});
	})
	.put(function(req, res){
		Usuario.findOne({'email': req.params.correo}, function(err, user){
			if(err)
				res.send(err);

			user.nombre = req.body.nombre;
			user.foto = req.body.foto;
			user.email = req.body.email;
			user.contrasena = req.body.contrasena;
			user.pin = req.body.pin;
			user.estado = req.body.estado;

			user.save(function(err){
				if(err)
					res.send(err);
				res.json(user);
			});
		});
	})
	.delete(function(req, res){
		Usuario.remove({'email': req.params.correo}, function(err, user){
			if(err)
				res.send(err);
			Usuario.find(function(err, users){
				if(err)
					res.send(err);
				res.json(users);
			});
		});
	});

router.route('/chats')
	.post(function(req, res){

		var chat = new Chat();

		chat.remitente = req.body.remitente;
		chat.destinatario = req.body.destinatario;
		chat.mensaje = req.body.mensaje;
		chat.tiempo = Date.now();

		chat.save(function(err, mensajes){
			if(err)
				res.send(err);
			res.json(mensajes);
		});
	})
	.get(function(req, res){
		Chat.find(function(err, msgs){
			if(err)
				res.send(err);
			res.json(msgs);
		});
	});
router.route('/chats/emisor/:remitente')
	.get(function(req, res){
		Chat.find({'remitente': req.params.remitente}, function(err, msgs){
			if(err)
				res.send(err);
			res.json(msgs);
		});
	});
router.route('/chats/receptor/:destinatario')
	.get(function(req, res){
		Chat.find({'destinatario': req.params.destinatario}, function(err, msgs){
			if(err)
				res.send(err);
			res.json(msgs);
		});
	});

app.use('/api', router);

app.listen(port);
console.log('Conexión establecida por el puerto '+port);
