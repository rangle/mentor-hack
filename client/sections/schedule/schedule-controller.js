'use strict';

angular.module('app')
  .controller('ScheduleCtrl', function($scope, server, $rootScope, koast, $log) {


    var mentorQuery = {
      isMentor: true
    };

    var getUsers = function(query){
      koast.queryForResources('users', query)
        .then(function (users) {
          $scope.mentors = users;
        }, $log.error);
    };

    getUsers(mentorQuery);
    $scope.teams = server.teams;
    $scope.predicate = '';

    $scope.isAuthenticated = true;

    $scope.setMentorPredicate = function(predicate) {
      $scope.predicate = predicate;
    };

    $scope.resetMentorPredicate = function(predicate) {
      $scope.predicate = '';
    };

    $rootScope.$on('updateMentorList', function(e){
      getUsers(mentorQuery);
    });

    $scope.mentorFilter = [
      {type: 'developer', label: 'Developer'},
      {type: 'clinician', label: 'Clinical Expert'},
      {type: 'designer', label: 'Designer'}
    ];
  });