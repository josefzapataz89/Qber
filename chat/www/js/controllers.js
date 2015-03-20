angular.module('starter.controllers', ['ionic'])

.controller('loginCtrl', function($scope, $ionicModal, $state, $http){

$scope.dataUsuario = {};
$scope.nuevo = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/registro.html', {
    id: '1',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal1 = modal;
  });

  $ionicModal.fromTemplateUrl('templates/recuperar.html', {
    id: '2',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });


   $scope.cerrarModal = function(index) {
      if(index == 1) $scope.modal1.hide();
      else $scope.modal2.hide();
    };


  // Open the login modal
  $scope.abrirModal = function(index) {
     if(index == 1) $scope.modal1.show();
      else $scope.modal2.show();
  };

//---
$scope.usuario = [];
$scope.nuevousuario = {};
$scope.nuevo2 = {};
/*--------------  HTTP conexion con el webService  --------------*/
 

    $scope.registrarU = function(){
     //$scope.nuevo2 = per;
     alert('le entro');

    $http.post('http://localhost:5000/usuarios', $scope.nuevousuario)
    .success(function(data){
    console.log(data);
    })
    .error(function(per){
      console.log('Error: ' + per);
    });


     // console.log($scope.nuevo2.nombre);
    };

    $scope.validarcorreo = function(){

        $http.get('http://localhost:5000/usuarios/' + $scope.nuevousuario.email)
              .success(function(data){

                if(data  == ""){
                  console.log('holisss');
                  //$scope.registrar($scope.nuevousuario);
                }else{
                console.log(data);
                }
              })
              .error(function(data){
                 console.log('Error: ' + data);
              });
    };
//---


})

.controller('ContactsCtrl', function($scope, $http, $ionicModal, Agenda) {
  $scope.contactos = [];
  $scope.nuevoContacto = {};
  $scope.nuevo = {};
/*--------------  HTTP conexion con el webService  --------------*/
  $http.get('http://localhost:5000/usuarios')
    .success(function(data){
      $scope.contactos = data;
      console.log(data);
    })
    .error(function(data){
      console.log('Error: ' + data);
    });

    $scope.agregar = function(user){
      $scope.nuevo = user;
            
      console.log($scope.nuevo.nombre);
    };

    $scope.buscarCorreo = function(){
        $http.get('http://localhost:5000/usuarios/'+$scope.nuevoContacto.correo)
              .success(function(data){
                  $scope.agregar(data);
              })
              .error(function(data){
                 console.log('Error: ' + data);
              });
    };
   
  /*-------------------   Final conexion webService  --------------------*/
  $ionicModal.fromTemplateUrl('templates/agregaContacto.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
      $scope.modalNU = modal;
  });

  $scope.abrirModal = function(){
    $scope.modalNU.show();
    };
  $scope.cerrarModal = function(){
     $scope.modalNU.hide();
  };
  $scope.ejecutar = function(){
    console.log('ejecutando', $scope.contactos);
    $timeout(function(){
      $scope.modalNU.hide();
    },1000);
  };
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

  $scope.status = 'Feliz <3';
  $scope.nombre = 'Milagros Paredes';
  $scope.foto = 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg';
})

.controller('configuracionCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


;
