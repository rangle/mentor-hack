/* global angular */

angular.module('app.authorization', [])

.factory('authorization', ['$log', '$location',
  function($log, $location) {
    'use strict';
    var service = {};

    /**
     * Hack to see if the user is an admin.
     * (Temporary) TODO
     */
    service.isUserAdmin = function() {
      return ($location.search()).isAdmin === 'true';
    };

    return service;
  }
])

;