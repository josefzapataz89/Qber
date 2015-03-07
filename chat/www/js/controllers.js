angular.module('starter.controllers', [])

.controller('loginCtrl', function($scope,  $state){
  $scope.login = function($scope, $state){
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
});