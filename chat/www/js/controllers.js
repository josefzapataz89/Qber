angular.module('starter.controllers', ['ionic'])

.controller('loginCtrl', function($scope, $ionicModal, $state){

$scope.dataUsuario = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/registro.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.cerrarregistro = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.abrirregistro = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.registrar = function() {
    console.log('recuperando', $scope.dataUsuario);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };


})

.controller('ContactsCtrl', function($scope, Directorio) {
  $scope.contactos = Directorio.all();
  $scope.borrar = function(contacto){
    Directorio.remove(contacto);
  }
})


.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) { 
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('perfilCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('configuracionCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


;
