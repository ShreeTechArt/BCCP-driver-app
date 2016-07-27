angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



  .state('splash', {
    url: '/splash',
    templateUrl: 'templates/splash.html',
    controller: 'splashCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('forgotPassword', {
    url: '/forgot-password',
    templateUrl: 'templates/forgotPassword.html',
    controller: 'forgotPasswordCtrl'
  })
  
    .state('menu', {
    url: '/side-menu',
    templateUrl: 'templates/menu.html',
    abstract:true,
    controller: 'menuCtrl'
  })

  
   .state('notApproved', {
    url: '/not-approved.php',
    templateUrl: 'templates/notApproved.html',
    controller: 'notApprovedCtrl'
  })
  
  .state('menu.accountSettings', {
    url: '/account-settings.php',
    views: {
      'side-menu': {
        templateUrl: 'templates/accountSettings.html',
        controller: 'accountSettingsCtrl'
      }
    }
  })

  .state('menu.passwordSettings', {
    url: '/password-settings.php',
    views: {
      'side-menu': {
        templateUrl: 'templates/passwordSettings.html',
        controller: 'passwordSettingsCtrl'
      }
    }
  })
  
    .state('menu.geolocation', {
    url: '/geolocation.php',
    views: {
      'side-menu': {
        templateUrl: 'templates/geolocation.html',
        controller: 'geolocationCtrl'
      }
    }
  })
  

  
  .state('menu.messages', {
    url: '/messages.php',
    views: {
      'side-menu': {
        templateUrl: 'templates/messages.html',
        controller: 'messagesCtrl'
      }
    }
  })
  
    .state('menu.messagesCreate', {
    url: '/messagesCreate.php',
    views: {
      'side-menu': {
        templateUrl: 'templates/messagesCreate.html',
        controller: 'messagesCreateCtrl'
      }
    }
  })
  
   .state('menu.messagesView', {
    url: '/messagesView.php/:id/:content/:type/:datetime/:to_user_id/:from_user_id/:to/:from',
    views: {
      'side-menu': {
        templateUrl: 'templates/messagesView.html',
        controller: 'messagesViewCtrl'
      }
    }
  })

    
  .state('menu.messagesReply', {
    url: '/messagesReply.php/:id/:content/:type/:datetime/:to_user_id/:from_user_id/:to/:from',
    views: {
      'side-menu': {
        templateUrl: 'templates/messagesReply.html',
        controller: 'messagesReplyCtrl'
      }
    }
  })
  
  

$urlRouterProvider.otherwise('/splash')

  

});
