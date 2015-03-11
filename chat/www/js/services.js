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
;
