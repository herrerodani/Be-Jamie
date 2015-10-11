// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js 
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers', 'starter.services', 'highcharts-ng'])

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
      StatusBar.styleLightContent();
    }
  });
})
.run(function($http, $rootScope, $interval) {
  // "https://api.particle.io/v1/devices/0123456789abcdef/analogvalue?access_token=123412341234"
  // deviceid 24001f000447343232363230
  // access token 184a645cf6ad14230a1f3733880d3a471ba77199
  $interval(function() {
    $http.get('https://api.particle.io/v1/devices/24001f000447343232363230/temp', {
      params : {
        access_token : '184a645cf6ad14230a1f3733880d3a471ba77199'
      }
    })
    .then(function(result) {
      //console.log('temp', result.data.result);
      $rootScope.$broadcast('tempChange', Math.round(result.data.result));
    })
    .catch(function(error) {
      console.error(error);
    });
    $http.get('https://api.particle.io/v1/devices/24001f000447343232363230/thermo', {
      params : {
        access_token : '184a645cf6ad14230a1f3733880d3a471ba77199'
      }
    })
    .then(function(result) {
      //console.log('tempT', result.data.result);
      $rootScope.$broadcast('intTempChange', Math.round(result.data.result));
    })
    .catch(function(error) {
      console.error(error);
    });
  }, 500);

  $http.get('https://api.particle.io/v1/devices/24001f000447343232363230/temp', {
      params : {
        access_token : '184a645cf6ad14230a1f3733880d3a471ba77199'
      }
    })
    .then(function(result) {
      //console.log('temp', result.data.result);
      $rootScope.$broadcast('tempChange', Math.round(result.data.result));
    })
    .catch(function(error) {
      console.error(error);
    });
    $http.get('https://api.particle.io/v1/devices/24001f000447343232363230/thermo', {
      params : {
        access_token : '184a645cf6ad14230a1f3733880d3a471ba77199'
      }
    })
    .then(function(result) {
      //console.log('tempT', result.data.result);
      $rootScope.$broadcast('intTempChange', Math.round(result.data.result));
    })
    .catch(function(error) {
      console.error(error);
    });
  

})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.data', {
    url: '/data',
    views: {
      'tab-data': {
        templateUrl: 'templates/tab-data.html',
        controller: 'DataCtrl'
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
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
  .state('tab.ingredients', {
      url: '/ingredients',
      views: {
        'tab-ingredients': {
          templateUrl: 'templates/tab-ingredients.html',
          controller: 'IngredientsCtrl'
        }
      }
    })


  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

/*
  "app_id": "41d8c396"
  */