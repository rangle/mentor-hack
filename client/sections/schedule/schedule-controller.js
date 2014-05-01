'use strict';

angular.module('app')
  .controller('ScheduleCtrl', function($scope, server) {

    $scope.mentors = server.users;
    $scope.teams = server.teams;
    $scope.predicate = '';

    $scope.setMentorPredicate = function(predicate) {
      $scope.predicate = predicate;
    }

    $scope.resetMentorPredicate = function(predicate) {
      $scope.predicate = '';
    }

    $scope.mentorFilter = [
      {type: 'developer', label: 'Developer'},
      {type: 'clinician', label: 'Clinical Expert'},
      {type: 'designer', label: 'Designer'}
    ];
  });