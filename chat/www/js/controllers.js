angular.module('starter.controllers', ['ionic'])

.controller('loginCtrl', function($scope, $ionicModal, $state, $http){

$scope.dataUsuario = {};
$scope.nuevo = {};

  $scope.agregarUsuario = function(){
<<<<<<< HEAD
    $scope.nuevo.nombre = $scope.dataUsuario.Nombre;
=======
    $scope.nuevo.nombre = $scope.dataUsuario.nombre;
>>>>>>> MilagrosParedes/master
    $scope.nuevo.foto = $scope.dataUsuario.foto;
    $scope.nuevo.email = $scope.dataUsuario.email;
    $scope.nuevo.contrasena = $scope.dataUsuario.contra;
    $scope.nuevo.pin = $scope.dataUsuario.pin;
    $scope.nuevo.estado = "Comenzando a usar Qber";
 
  console.log($scope.nuevo);

    $http({
        method: 'POST',
        url: 'http://localhost:5000/api/usuarios',
        data: $scope.nuevo,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        })
      .success(function(data){
        console.log(data);
      })
      .error(function(err){
        console.log(err);
      });
  };

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

    $http.post('http://localhost:5000/api/usuarios', $scope.nuevousuario)
      .success(function(data){
      console.log(data);
      })
      .error(function(per){
        console.log('Error: ' + per);
      });


     // console.log($scope.nuevo2.nombre);
    };

    $scope.validarcorreo = function(){

        $http.get('http://localhost:5000/api/usuarios/' + $scope.nuevousuario.email)
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
    $scope.contactos = Agenda.listarContactos();

    $scope.agregar = function(user){
      if(user!== ""){
        console.log('si ta registrado');
        console.log(user);
        var contacto = {};
        contacto.nombre = user.nombre;
        contacto.correo = user.email;
        contacto.status  = user.status;
        contacto.imagen = user.face;
        Agenda.agregar(contacto);
      }
      else{
        console.log('no esta registrado');
        alert('No se encuentra ningun usuario con el correo');
      }
    };
    $scope.borrarC = function(user){
      Agenda.eliminarContacto(user);
      $scope.contactos = Agenda.listarContactos();
    };

    $scope.buscarCorreo = function(){
        $http.get('http://localhost:5000/api/usuarios/'+$scope.nuevoContacto.correo)
              .success(function(data){
                  $scope.agregar(data);
              })
              .error(function(data){
                 console.log('Error: ' + data);
              });
    };
   
  /*-------------------   Final conexion webService  --------------------*/
  $ionicModal.fromTemplateUrl('templates/agregaContacto.html', {
    id: '3',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
      $scope.modal3 = modal;
  });

   $ionicModal.fromTemplateUrl('templates/NuevoChat.html', {
    id: '4',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) { 
    $scope.modal4 = modal;
  });

  $scope.abrirModal = function(index){
      if(index == 3) $scope.modal3.show();
      else $scope.modal4.show();
    };
  $scope.cerrarModal = function(index){
      if(index == 3) $scope.modal3.hide();
      else $scope.modal4.hide();
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
<<<<<<< HEAD
  }
=======
  };
})

>>>>>>> MilagrosParedes/master


.controller('ChatsCtrl', function($scope) {
  

})

.controller('ChatDetailCtrl', function($scope, $stateParams) {
//  $scope.chat = Chats.get($stateParams.chatId);
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
<<<<<<< HEAD
  $scope.settings = {
    enableFriends: true
  };
=======
  $scope.settings = { enableFriends: true };
>>>>>>> MilagrosParedes/master
});
