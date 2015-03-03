angular.module('starter.controllers', [])

.controller('inicioCtrl', function($scope, $ionicModal, $timeout){
  $scope.userData = {};
  $ionicModal.fromTemplateUrl('templates/recuperar.html', {
    scope: $scope  
  }).then(function(modal){
      $scope.modal = modal;
  });
  $scope.cerrarRecuperar = function(){
    $scope.modal.hide();
  };
  $scope.abrirRecuperar = function(){
    $scope.modal.show();
  };
  $scope.recuperar = function(){
    console.log('recuperar contrasena', $scope.userData);
    $timeout(function() {
      $scope.cerrarRecuperar();
    }, 1000);
  };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout){
  $scope.loginData = {};
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.login = function() {
    $scope.modal.show();
  };
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});
