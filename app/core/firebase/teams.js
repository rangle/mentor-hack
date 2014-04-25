/* global angular */

angular.module('app')

.factory('teams', ['$firebase',
  function ($firebase) {

    var service = {};
    var ref = new Firebase('https://mentor-health.firebaseio.com/Teams');
    service.items = $firebase(ref);

    service.getTeamById = function(teamId) {
      console.log('items', service.items);
      return _.find(service.items, function(item) {
        return item.id == teamId;
      });
    };

    return service;
  }
]);