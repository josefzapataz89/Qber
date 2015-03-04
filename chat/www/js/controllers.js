angular.module('starter.controllers', ['ionic'])

.controller('InicioCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.dataUsuario = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/recuperar.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.cerrarRecuperar = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.abrirRecuperar = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.recuperar = function() {
    console.log('recuperando', $scope.dataUsuario);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
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
