/* global angular */

angular.module('app.server', [
  'koast'
])

.factory('server', ['koast', '$q', '$log',
  function(koast, $q, $log) {
    'use strict';
    var service = {};
    var promiseArray = [];

    ['users', 'teams'].forEach(function(endpoint) {
      var promise = koast.queryForResources(endpoint)
        .then(function(data) {
          service[endpoint] = data;
        })
        .then(null, function(error) {
          $log.error(error);
          throw error;
        });
        promiseArray.push(promise);
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