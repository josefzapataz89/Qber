angular.module('starter.services', ["LocalStorageModule"])

  .factory('Agenda', function(localStorageService){
    var agenda = {};

    agenda.key = "Qber-agenda";

    if(localStorageService.get(agenda.key)){
      agenda.contactos = localStorageService.get(agenda.key);
    }
    else{
      agenda.contactos = [];
    }

    agenda.updateLocalStorage = function(){
      localStorageService.set(agenda.key, agenda.contactos);
    };

    agenda.agregar = function(nuevoContacto){
      agenda.contactos.push(nuevoContacto);
      agenda.updateLocalStorage();
    };

    agenda.listarContactos = function(){
      return agenda.contactos;
    };

    agenda.limpiar = function(){
      agenda.contactos = [];
      agenda.updateLocalStorage();
      return agenda.listarContactos();
    };

    agenda.eliminarContacto = function(item){
      agenda.contactos = agenda.contactos.filter(function(contacto){
        return contacto !== item;
      });
      agenda.updateLocalStorage();
      return agenda.listarContactos();
    };

    return agenda;

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
