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
;
