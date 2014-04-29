/* global angular */

angular.module('app.server', [
  'koast'
])

.factory('server', ['koast',
  function(koast) {
    var service = {};
    var promiseArray = [];

    ['users', 'teams'].forEach(function(endpoint) {
      var promise = koast.queryForResources(endpoint)
        .then(function(users) {
          console.log('Users', users);
          service.users = users;
        })
        .then(null, $log.error);
      });

    service.whenReady = function() {
      return $q.all(promiseArray);
    };

    return service;
  }
])

.run(['koast',
  function(koast) {
    koast.setApiUriPrefix('/api/');
    koast.addEndpoint('users', ':_id');
    koast.addEndpoint('teams', ':_id');
  }
]);