'use strict';

angular.module('app')
  .controller('ScheduleCtrl', function($scope, server, $rootScope, koast, $log) {


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

    $scope.isAuthenticated = true;

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

    $rootScope.$on('updateTeamList', function(e){
      getTeams(teamQuery);
    });

    $scope.mentorFilter = [
      {type: 'developer', label: 'Developer'},
      {type: 'clinician', label: 'Clinical Expert'},
      {type: 'designer', label: 'Designer'},
      {type: 'healthcare admin', label: 'Health Care Administrator'},
      {type: 'business', label: 'Business/Legal'}
    ];
  });