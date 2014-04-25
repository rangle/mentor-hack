/* global angular */

// The main app module should be very small and should probably be limited to
// declaring the dependencies and maybe having a run block.

angular.module('app', [
  'app.components.main-controller',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'sections/main/main.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo:'/'
    });
})
