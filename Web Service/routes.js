module.exports = function(app){

	var USUARIOS = require('./usuarios');
	var MSJ = require('./mensajes');

	//MOSTRAR TODOS LOS USUARIOS

	findAllUsers = function(req, res){
		 USUARIOS.find(function(err, usuario){
		 	if(!err) res.send(usuario);
		 	else console.log('ERROR: '+err);
		 });	
	};


	//BUSCAR UN USUARIO EN ESPECIFICO POR CORREO

	findByEMAIL = function(req, res){
		USUARIOS.findOne().where('email', req.params.email).exec(function(err, doc){
   			if(!err) res.send(doc);
		 	else console.log('ERROR: '+err);
		});
	};


	// BUSCAR MENSAJES ENVIADOS POR UN USUARIO

	findByEM = function(req, res){
		MSJ.findOne().where('emisor', req.params.emisor).exec(function(err, doc){
   			console.log(err);
   			console.log(doc);
			res.send(doc);
		});
	};


	// BUSCAR MENSAJES RECIBIDOS POR UN USUARIO

	findByREC = function(req, res){
		MSJ.findOne().where('receptor', req.params.receptor).exec(function(err, doc){
   			console.log(err);
   			console.log(doc);
				res.send(doc);

		});
	};

	//AGREGAR UN USUARIO

	addUser = function(req, res){
		console.log('POST');
		console.log(req.body);

		var usuario = new USUARIOS({
			nombre: req.body.nombre,
			foto: req.body.foto,
			email: req.body.email,
			contrasena: req.body.contrasena,
			pin: req.body.pin,
			status: req.body.status
		});

		usuario.save(function(err){
			if(!err) console.log('Usuario agregado con exito!');
			else console.log('ERROR: '+err);
		});

		res.send(usuario);
	};

	//NUEVO UN MENSAJE

	addMsj = function(req, res){
		console.log('POST');
		console.log(req.body);

		var msj = new MSJ({
			emisor: req.body.emisor,
			receptor: req.body.receptor,
			mensaje: req.body.mensaje
		});

		msj.save(function(err){
			if(!err) console.log('Mensaje agregado con exito!');
			else console.log('ERROR: '+err);
		});

		res.send(msj);
	};

	//MODIFICAR UN USUARIO (FILTRANDO POR EMAIL)

	updateUser = function(req, res){
		USUARIOS.findByEmail(req.params.email, function(err, usuario){
			usuario.nombre = req.body.nombre,
			usuario.foto = req.body.foto,
			usuario.email = req.body.email,
			usuario.contrasena = req.body.contrasena,
			usuario.pin = req.body.pin,
			usuario.status = req.body.status;

			usuario.save(function(err){
						if(!err) console.log('Usuario Actualizado con exito!');
						else console.log('ERROR: '+err);
					})
		});		

		
	};

	//ELIMINAR USUARIO

	deleteUser = function(req, res){
		USUARIOS.findByEmail(req.params.email, function(err, usuario){
			usuario.remove(function(err){
				if(!err) console.log('Usuario eliminado con exito!');
			else console.log('ERROR: '+err);
			})
		});
	}

	// API Routes

	app.get('/usuarios', findAllUsers);
	app.get('/usuarios/:email', findByEMAIL);
	app.post('/usuarios', addUser);
	app.put('/usuarios/:email', updateUser);
	app.delete('/usuarios/:email', deleteUser);

	app.post('/mensajes', addMsj);
	app.get('/mensajes/receptor/:receptor', findByREC);
	app.get('/mensajes/emisor/:emisor', findByEM);
}