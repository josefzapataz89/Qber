module.exports = function(app){

	var USUARIOS = require('./usuarios');

	//MOSTRAR TODOS LOS USUARIOS

	findAllUsers = function(req, res){
		 USUARIOS.find(function(err, usuario){
		 	if(!err) res.send(usuario);
		 	else console.log('ERROR: '+err);
		 });	
	};


	//BUSCAR UN USUARIO EN ESPECIFICO

	findByID = function(req, res){
		USUARIOS.findById(req.params.id, function(err, usuario) {
			if(!err) res.send(usuario);
			else console.log('ERROR: '+err);
		});
	};

	//AGREGAR UN USUARIO

	addUser = function(req, res){
		console.log('POST');
		console.log(req.body);

		var usuario = new USUARIOS({
			nombre: req.body.nombre,
			numphone: req.body.numphone,
			user: req.body.user
		});

		usuario.save(function(err){
			if(!err) console.log('Usuario agregado con exito!');
			else console.log('ERROR: '+err);
		});

		res.send(usuario);
	};

	//MODIFICAR UN USUARIO

	updateUser = function(req, res){
		USUARIOS.findById(req.params.id, function(err, usuario){
			usuario.nombre = req.body.nombre,
			usuario.numphone = req.body.numphone,
			usuario.user = req.body.user;

			usuario.save(function(err){
						if(!err) console.log('Usuario Actualizado con exito!');
						else console.log('ERROR: '+err);
					})
		});		

		
	};

	//ELIMINAR USUARIO

	deleteUser = function(req, res){
		USUARIOS.findById(req.params.id, function(err, usuario){
			usuario.remove(function(err){
				if(!err) console.log('Usuario eliminado con exito!');
			else console.log('ERROR: '+err);
			})
		});
	}

	// API Routes

	app.get('/usuarios', findAllUsers);
	app.get('/usuarios/:id', findByID);
	app.post('/usuarios', addUser);
	app.put('/usuarios/:id', updateUser);
	app.delete('/usuarios/:id', deleteUser);
}