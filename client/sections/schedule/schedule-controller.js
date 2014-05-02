'use strict';
/*
angular.module('app').directive('initiateAuthentication', ['$modal',
  function($modal) {

    return{
      restrict: 'A',
      link: function(scope, element, attrs){
console.log("here");
        var showAuthenticationModal = function() {
          $modal.open({
            templateUrl : '/client/components/authentication/authentication.tpl.html',
            controller  : 'AuthCtrl'
          });
        };

        element.on('click', showAuthenticationModal);

      }
    }

  }
])
.controller('AuthCtrl', ["$scope", "$modalInstance", "$http", function($scope, $modalInstance, $http){
  console.log("here in AuthCtrl");
  $scope.login = function () {
        console.log('Login:', $scope.username, $scope.password);
        var config = {
          params: {
            username: $scope.username,
            password: $scope.password
          }
        };
        return $http.post('/auth/login', {username: $scope.username, password: $scope.password})
          .then(function (response) {
            //setUserData(response);
            //authenticationDeferred.resolve();
            $rootScope.isAuthenticated = true;
            $modalInstance.dismiss();
          }).fail(function (err) {
            console.error(err);
            $modalInstance.dismiss();
          });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
    };

}])*/
  angular.module('app').controller('ScheduleCtrl', function($scope, server, $rootScope, koast, _koastUser, $http, $log, authorization) {


    var mentorQuery = {
      isMentor: true
    };

    var teamQuery = {

    };

    var getUsers = function(query){
      koast.queryForResources('users', query)
        .then(function (users) {
          $scope.mentors = users;
        }, $log.error);
    };

    var getTeams = function(query){
      koast.queryForResources('teams', query)
        .then(function(teams){
          $scope.teams = teams;
        }, $log.error)
    };

    getUsers(mentorQuery);
    getTeams(teamQuery);
//    $scope.teams = server.teams;
    $scope.predicate = '';
    
    $scope.login = function() {
      if ($scope.isAuthenticated) {
        $scope.isAuthenticated = false;
      }
      else {
        var pass = prompt("Passcode?");
        $http.post('/auth/login', {username: 'mentorhealth', password: pass})
          .then(function (response) {
            if (!response.data.isAdmin) {
              console.error('Failed to login.');
              $scope.isAuthenticated = false;
            } else {
              console.log(arguments);
              $scope.isAuthenticated = true;
            }
          }, function() {
            $scope.isAuthenticated = false;
          });
      }
    };
    $scope.isAuthenticated = false;

    $scope.getAuthenticationText = function() {
      return $scope.isAuthenticated ? "Log out" : "Log in";
    }

    _koastUser.getStatusPromise().then( function(data) {
      $scope.isAuthenticated = !!data;
    });

    $rootScope.$on('updateMentorList', function(e){
      getUsers(mentorQuery);
    });

    $rootScope.$on('updateTeamList', function(e){
      getTeams(teamQuery);
    });

    $scope.mentorFilter = [
      {type: 'developer', label: 'Developer'},
      {type: 'clinician', label: 'Clinical Expert'},
      {type: 'designer', label: 'Designer'},
      {type: 'healthcareAdmin', label: 'Health Care Administrator'},
      {type: 'business', label: 'Business/Legal'}
    ];
  });