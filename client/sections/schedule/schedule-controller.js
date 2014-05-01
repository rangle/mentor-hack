'use strict';

angular.module('app')
  .controller('ScheduleCtrl', function($scope, server) {

    $scope.mentors = server.users;
    $scope.teams = server.teams;
    $scope.predicate = '';

    $scope.mentorFilter = [
      {type: 'developer', label: 'Developer'},
      {type: 'clinitian', label: 'Clinical Expert'},
      {type: 'designer', label: 'Designer'}
    ];
  });