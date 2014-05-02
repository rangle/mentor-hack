/* global angular */

// The main app module should be very small and should probably be limited to
// declaring the dependencies and maybe having a run block.

angular.module('app', [
  'app.components.mentor-schedule-directive',
  'ngRoute',
  'ui.bootstrap',
  'app.server',
  'ngDragDrop',
  'angularFileUpload',
  'koast-user'
])
.config(function($routeProvider) {
  $routeProvider
    .when('/',  {
      templateUrl: 'client/sections/schedule/schedule.html',
      controller: 'ScheduleCtrl'
    })
    .otherwise({
      redirectTo:'/'
    });
})
.run(['server', '$log', '_koastUser', '$rootScope', function(server, $log, _koastUser, $rootScope) {
  server.whenReady()
    .then(function() {
      $rootScope.isAuthenticated = true; //_koastUser.isAuthenticated;
      if (!_koastUser.isAuthenticated) {
        console.log("Unauthenticated user");
      }
      console.log('*Users:', server.users);
      console.log('*Teams:', server.teams);

    })
    .then(null, $log.error);
}]);

