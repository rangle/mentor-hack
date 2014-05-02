/* global angular */

angular.module('app.teams', [
  'app.server'
])

.factory('teams', ['server', '$log',
  function(server, $log) {
    'use strict';

    var service = {};
    var teams = {};

    var promise = server.whenAvailable()
      .then(function() {
        teams = server.teams;
      })
      .then(null, $log.error);

    service.whenAvailable = function() {
      return promise;
    };

    //service.getTeams

    service.getById = function(desiredId) {
      _.find(service.all, function(item) {
        return item._id === desiredId;
      });
    };

    return service;
  }
]);