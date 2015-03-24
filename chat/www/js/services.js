angular.module('starter.services', ["LocalStorageModule"])

  .factory('Agenda', function($http){
    var contactos = [];
    var agenda = {};

    agenda.agregar = function(nuevoContacto){
      nuevoContacto.propietario = "jose@gmail.com";
      $http.post('http://localhost:5000/api/agenda', nuevoContacto)
        .success(function(data){
          console.log('agrego contacto');
          console.log(data);
        })
        .error(function(error){
          console.log(error);
        });
    };

    agenda.limpiar = function(){
      $http.delete('http://localhost:5000/api/agenda/jose@gmail.com')
        .success(function(data){
          console.log('borrando lista de contactos');
          console.log(data);
        })
        .error(function(error){
          console.log(error);
        });
    };

    agenda.eliminarContacto = function(item){
      $http.delete('http://localhost:5000/api/agenda/jose@gmail.com/'+item.correo)
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
            mensajes = chat;
          })
          .error(function(err){
            console.log(err);
          });
       };

       chats.listarConversaciones = function(){
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
        $post('http://localhost:5000/api/chats', mensaje)
          .success(function(data){
            console.log(data);
          })
          .error(function(err){
            console.log(err);
          });
       };
       
       return chats;
  })

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
  ;

