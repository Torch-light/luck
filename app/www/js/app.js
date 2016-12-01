// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('luck', ['ionic','ngAnimate','toastr'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(['$stateProvider', '$urlRouterProvider','$ionicConfigProvider',function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
        $ionicConfigProvider.platform.ios.tabs.style('standard'); 
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive


  // Each tab has its own nav history stack:


   .state('login', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl as vm'
  })
  .state('register', {
      cache: false,
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl as vm'
    })
    .state('changepassword', {
      cache: false,
      
      url: '/change',
      templateUrl: 'templates/change.html',
      controller: 'changeCtrl as vm'

    })
    .state('home',{
      url:'/home',
      abstract:true,
      templateUrl:'templates/home.html',
      controller:'homeCtrl as vm'
    })
    .state('home.user',{
      url:'/user',
      cache:false,
      views:{
        'home-user':{
          templateUrl:'templates/user.html',
          controller:'userCtrl as vm'
        }
      }
    })
    .state('home.seeting',{
      url:'/seeting',
      cache:false,
      views:{
        'home-seeting':{
          templateUrl:'templates/seeting.html',
          controller:'seetingCtrl as vm'
        }
      }
    })
    .state('home.history',{
      url:'/history',
      cache:false,
      views:{
        'home-history':{
          templateUrl:'templates/history.html',
          controller:'historyCtrl as vm'
        }
      }
    })

    .state('home.action',{
      url:'/action',
      cache:false,
      views:{
        'home-action':{
          templateUrl:'templates/action.html',
          controller:'actionCtrl as vm'
        }
      }
    })
    .state('reviewed',{
      url:'/reviewed',
      cache:false,
      templateUrl:'templates/reviewed.html',
      controller:'reviewedCtrl as vm'

    })
    .state('invite',{
      url:'/invite',
      cache:false,
      templateUrl:'templates/invite.html',
      controller:'inviteCtrl as vm'
    })
    $urlRouterProvider.otherwise('/login');
  // $urlRouterProvider.otherwise('/login');

  // if none of the above states are matched, use this as the fallback



  // // if none of the above states are matched, use this as the fallback
}]);