/* global angular */

// The main app module should be very small and should probably be limited to
// declaring the dependencies and maybe having a run block.

angular.module('app', [
  'app.components.main-controller',
  'ui.router'
])
// Ui-Router Definitions
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'sections/main/main.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('/');
})
