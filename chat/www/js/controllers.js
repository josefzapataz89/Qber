angular.module('starter.controllers', ['ionic'])

.controller('loginCtrl', function($scope, $ionicModal, $state, $http){

$scope.dataUsuario = {};
$scope.nuevo = {};

  $scope.agregarUsuario = function(){
    $scope.nuevo.nombre = $scope.dataUsuario.Nombre;
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

/*------------------------- CONTROLADOR DEL CHAT------------------------*/

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('UserMessages', {
    url: '/UserMessages',
    templateUrl: 'templates/UserMessages.html',
    controller: 'UserMessagesCtrl'
  });

  $urlRouterProvider.otherwise('/UserMessages');
})  


.controller('UserMessagesCtrl', ['$scope', '$rootScope', '$state',
  '$stateParams', 'MockService', '$ionicActionSheet',
  '$ionicPopup', '$ionicScrollDelegate', '$timeout', '$interval',
  function($scope, $rootScope, $state, $stateParams, MockService,
    $ionicActionSheet,
    $ionicPopup, $ionicScrollDelegate, $timeout, $interval) {

    // mock acquiring data via $stateParams
    $scope.toUser = {
      _id: '534b8e5aaa5e7afc1b23e69b',
      pic: 'http://ionicframework.com/img/docs/venkman.jpg',
      username: 'Venkman'
    }

    // this could be on $rootScope rather than in $stateParams
    $scope.user = {
      _id: '534b8fb2aa5e7afc1b23e69c',
      pic: 'http://ionicframework.com/img/docs/mcfly.jpg',
      username: 'Marty'
    };

    $scope.input = {
      message: localStorage['userMessage-' + $scope.toUser._id] || ''
    };

    var messageCheckTimer;

    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
    var footerBar; // gets set in $ionicView.enter
    var scroller;
    var txtInput; // ^^^

    $scope.$on('$ionicView.enter', function() {
      console.log('UserMessages $ionicView.enter');

      getMessages();
      
      $timeout(function() {
        footerBar = document.body.querySelector('#userMessagesView .bar-footer');
        scroller = document.body.querySelector('#userMessagesView .scroll-content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);

      messageCheckTimer = $interval(function() {
        // here you could check for new messages if your app doesn't use push notifications or user disabled them
      }, 20000);
    });

    $scope.$on('$ionicView.leave', function() {
      console.log('leaving UserMessages view, destroying interval');
      // Make sure that the interval is destroyed
      if (angular.isDefined(messageCheckTimer)) {
        $interval.cancel(messageCheckTimer);
        messageCheckTimer = undefined;
      }
    });

    $scope.$on('$ionicView.beforeLeave', function() {
      if (!$scope.input.message || $scope.input.message === '') {
        localStorage.removeItem('userMessage-' + $scope.toUser._id);
      }
    });

    function getMessages() {
      // the service is mock but you would probably pass the toUser's GUID here
      MockService.getUserMessages({
        toUserId: $scope.toUser._id
      }).then(function(data) {
        $scope.doneLoading = true;
        $scope.messages = data.messages;

        $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
      });
    }

    $scope.$watch('input.message', function(newValue, oldValue) {
      console.log('input.message $watch, newValue ' + newValue);
      if (!newValue) newValue = '';
      localStorage['userMessage-' + $scope.toUser._id] = newValue;
    });

    $scope.sendMessage = function(sendMessageForm) {
      var message = {
        toId: $scope.toUser._id,
        text: $scope.input.message
      };

      // if you do a web service call this will be needed as well as before the viewScroll calls
      // you can't see the effect of this in the browser it needs to be used on a real device
      // for some reason the one time blur event is not firing in the browser but does on devices
      keepKeyboardOpen();
      
      //MockService.sendMessage(message).then(function(data) {
      $scope.input.message = '';

      message._id = new Date().getTime(); // :~)
      message.date = new Date();
      message.username = $scope.user.username;
      message.userId = $scope.user._id;
      message.pic = $scope.user.picture;

      $scope.messages.push(message);

      $timeout(function() {
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 0);

      $timeout(function() {
        $scope.messages.push(MockService.getMockMessage());
        keepKeyboardOpen();
        viewScroll.scrollBottom(true);
      }, 2000);

      //});
    };
    
    // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
    function keepKeyboardOpen() {
      console.log('keepKeyboardOpen');
      txtInput.one('blur', function() {
        console.log('textarea blur, focus back on it');
        txtInput[0].focus();
      });
    }

    $scope.onMessageHold = function(e, itemIndex, message) {
      console.log('onMessageHold');
      console.log('message: ' + JSON.stringify(message, null, 2));
      $ionicActionSheet.show({
        buttons: [{
          text: 'Copy Text'
        }, {
          text: 'Delete Message'
        }],
        buttonClicked: function(index) {
          switch (index) {
            case 0: // Copy Text
              //cordova.plugins.clipboard.copy(message.text);

              break;
            case 1: // Delete
              // no server side secrets here :~)
              $scope.messages.splice(itemIndex, 1);
              $timeout(function() {
                viewScroll.resize();
              }, 0);

              break;
          }
          
          return true;
        }
      });
    };

    // this prob seems weird here but I have reasons for this in my app, secret!
    $scope.viewProfile = function(msg) {
      if (msg.userId === $scope.user._id) {
        // go to your profile
      } else {
        // go to other users profile
      }
    };
    
    // I emit this event from the monospaced.elastic directive, read line 480
    $scope.$on('taResize', function(e, ta) {
      console.log('taResize');
      if (!ta) return;
      
      var taHeight = ta[0].offsetHeight;
      console.log('taHeight: ' + taHeight);
      
      if (!footerBar) return;
      
      var newFooterHeight = taHeight + 10;
      newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;
      
      footerBar.style.height = newFooterHeight + 'px';
      scroller.style.bottom = newFooterHeight + 'px'; 
    });

}])   /*--------------------------  FIN CONTROLADOR CHAT------------------*/
 




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
  $scope.settings = {
    enableFriends: true
  };
});
