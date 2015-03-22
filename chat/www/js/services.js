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

  .factory('historialChat', function(localStorageService){
       var chats = {};

       chats.key = "Qber-mensaje";

       if(localStorageService.get(chats.key)){
        chats.mensaje = localStorageService.get(chats.key);
       }
       else{
        chats.mensajes = [];
       }
       chats.actualizarChats = function(){
        localStorageService.set(chats.key, chats.mensajes);
       };
       chats.agregarChat = function(nuevoMensaje){
        chats.mensajes.push(nuevoMensaje);
        chats.actualizarChats();
       };
       chats.cargarChats = function(){
        return chats.mensajes;
       };
       chats.limpiarHistorial = function(){
        chats.mensajes = [];
        chats.actualizarChats();
        return chats.cargarChats();
       };
       chats.eliminarChat = function(chat){
        chats.mensajes = chats.mensajes.filter(function(mensaje){
          return mensaje !== chat;
        });
        chats.actualizarChats();
        return cargarChats();
       };
  })
  
.factory('Sesion', function(SesionStorageService){
    var UsuarioConectado = {};

    UsuarioConectado.key = "Qber-UsuarioConectado";

    if(localStorageService.get(UsuarioConectado.key)){
      UsuarioConectado.Usuario = SesionStorageService.get(UsuarioConectado.key);
    }
    else{
      UsuarioConectado.Usuario = [];
    }

    UsuarioConectado.updateLocalStorage = function(){
      SesionStorageService.set(UsuarioConectado.key, UsuarioConectado.Usuario);
    };

    UsuarioConectado.agregar = function(nuevoContacto){
      UsuarioConectado.Usuario.push(nuevoContacto);
      UsuarioConectado.updateLocalStorage();
    };

    UsuarioConectado.eliminar = function(item){
      UsuarioConectado.Usuario = UsuarioConectado.Usuario.filter(function(Usuario){
        return Usuario !== item;
      });
      UsuarioConectado.updateLocalStorage();
      return UsuarioConectado.listarContactos();
    };

    return UsuarioConectado;

  })


.service('LoginService', function($q, $http) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            $http.get('http://localhost:5000/api/usuarios/'+name)
              .success(function(data){
                console.log('si esta en la base de datos.... seguimos a comparar la contraseña');
                if(data.contrasena==pw){
                  Sesion.agregar(data);
                  deferred.resolve('Welcome ' + name + '!');
                }  
              })
              .error(function(data){
                 console.log('Error: ' + data);
                 deferred.reject('Wrong credentials.');
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
})
  ;