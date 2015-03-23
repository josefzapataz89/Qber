// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'directives'])
.value('user','')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  //$httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  
    .state('inicio', {
      url: "/inicio",
      templateUrl: "templates/inicio.html",
      controller: 'loginCtrl'

    })
   
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.Contactos', {
    url: '/Contactos',
    views: {
      'tab-Contactos': {
        templateUrl: 'templates/tab-Contactos.html',
        controller: 'ContactsCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
  .state('tab.pchats', {
      url: '/pchats',
      views: {
        'tab-Pchats': {
          templateUrl: 'templates/tab-pchats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
/*
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
*/
  .state('tab.perfil', {
    url: '/perfil',
    views: {
      'tab-perfil': {
        templateUrl: 'templates/tab-perfil.html',
        controller: 'perfilCtrl'
      }
    }
  })

  .state('tab.configuracion', {
    url: '/configuracion',
    views: {
      'tab-configuracion': {
        templateUrl: 'templates/tab-Configuracion.html',
        controller: 'configuracionCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/inicio');

});
