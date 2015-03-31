angular.module('starter.services', ["LocalStorageModule"])

  .factory('Agenda', function($http,USER){
    var contactos = [];
    var agenda = {};

    agenda.agregar = function(nuevoContacto){
      nuevoContacto.propietario = USER.correo;
      $http.post('http://localhost:5000/api/agenda', nuevoContacto)
        .success(function(data){
          console.log('agrego contacto');
          console.log(data);
        })
        .error(function(error){
          console.log(error);
        });
    };

    agenda.limpiar = function(USER){
      $http.delete('http://localhost:5000/api/agenda/' + USER.correo)
        .success(function(data){
          console.log('borrando lista de contactos');
          console.log(data);
        })
        .error(function(error){
          console.log(error);
        });
    };

    agenda.eliminarContacto = function(item,USER){
      $http.delete('http://localhost:5000/api/agenda/'+ USER.correo + item.correo)
        .success(function(data){
          console.log('eliminando un contacto');
          console.log(data);
        })
        .error(function(err){
          console.log(err);
        });
    };

    return agenda;

  })

  .factory('historialChat', function($http, USER){
       var chats = {};

       var mensajes = [];
       var conversaciones = [];

       chats.cargar = function(datos){
        conversaciones = datos;
       };

       chats.actualizar = function(){
        return conversaciones;
       };

       chats.listarMensajes = function(contacto){
        $http.get('http://localhost:5000/api/chats/'+USER.correo+'/'+contacto.correo)
          .success(function(chat){
              console.log(USER.correo + contacto.correo);
            mensajes = chat;
          })
          .error(function(err){
            console.log(err);
          });
       };

       chats.listarConversaciones = function(contacto){
        $http.get('http://localhost:5000/api/chats')
          .success(function(convers){
            console.log('chats');
            console.log(convers);
            chats.cargar(convers);
          })
          .error(function(err){
            console.log(err);
          });
       };

       chats.subirMensaje = function(mensaje){
        $http.post('http://localhost:5000/api/chats', mensaje)
          .success(function(data){
            console.log(data);
          })
          .error(function(err){
            console.log(err);
          });
       };
       
       return chats;
  })
/*
.factory('variableG',function($scope, $http){
var conectado = 
})*/

.factory('UserService', function() {
  var User = {};

  var usuario = {};

  User.setUsuario = function(user){
    usuario = user;
  };
  User.getUsuario = function(){
    return usuario;
  };

  return User;
})
  /*
.factory('Sesion', function(localStorageService){
    var UsuarioConectado = {};
    var usuarioC;

    UsuarioConectado.key = "Qber-UsuarioConectado";

    if(localStorageService.get(UsuarioConectado.key)){
      UsuarioConectado.Usuario = localStorageService.get(UsuarioConectado.key);
    }
    else{
      UsuarioConectado.Usuario = [];
    }

    UsuarioConectado.updateLocalStorage = function(){
      localStorageService.set(UsuarioConectado.key, UsuarioConectado.Usuario);
    };

    UsuarioConectado.agregar = function(nuevoContacto){
      UsuarioConectado.Usuario.push(nuevoContacto);
      UsuarioConectado.updateLocalStorage();
    };

    UsuarioConectado.eliminar = function(item){
      UsuarioConectado.Usuario = UsuarioConectado.Usuario.filter(function(Usuario){
        usuarioC=null;
        return Usuario !== item;
      });
      UsuarioConectado.updateLocalStorage();
    };

    return UsuarioConectado;

  })


.service('LoginService', function($q, $http, Sesion) {
    return {
        loginUser: function(correo, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var conectado = correo;
            Sesion.usuarioC = conectado;


            $http.get('http://localhost:5000/api/usuarios/'+correo)
              .success(function(data){
                if(data && data.email== correo && data.contrasena==pw){
                  Sesion.agregar(data);
                  deferred.resolve('Bienvenido ' + correo + '!');
                }
                else{deferred.reject('Error al iniciar datos incorrectos.');}
              })
              .error(function(data){
                 console.log('Error: ' + data);
                 
              });
 
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    
    }


})*/
  ;
