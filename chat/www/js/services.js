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

    agenda.actualizarListaContactos = function(){
      localStorageService.set(agenda.key, agenda.contactos);
    };

    agenda.agregar = function(nuevoContacto){
      agenda.contactos.push(nuevoContacto);
      agenda.actualizarListaContactos();
    };

    agenda.listarContactos = function(){
      return agenda.contactos;
    };

    agenda.limpiar = function(){
      agenda.contactos = [];
      agenda.actualizarListaContactos();
      return agenda.listarContactos();
    };

    agenda.eliminarContacto = function(item){
      agenda.contactos = agenda.contactos.filter(function(contacto){
        return contacto !== item;
      });
      agenda.actualizarListaContactos();
      return agenda.listarContactos();
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
