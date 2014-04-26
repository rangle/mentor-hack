/* global angular */

// The main app module should be very small and should probably be limited to
// declaring the dependencies and maybe having a run block.

angular.module('app', [
  'app.components.main-controller',
  'ngRoute',
  'ui.bootstrap',
  'app.server'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/sections/main/main.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo:'/'
    });
})
.run(['server', '$log', function(server, $log) {
  server.whenReady()
    .then(function() {
      console.log('*Users:', server.users);
      console.log('*Teams:', server.teams);
    })
    .then(null, $log.error);
}]);

