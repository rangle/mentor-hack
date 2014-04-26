'use strict';

/* global angular */

// A controller module. Those normally should be a small as possible and
// should offload most of the work to services.

angular.module('app.components.main-controller', [])

.controller('MainCtrl', ['$scope', '$modal',
  function ($scope, $modal) {

    $scope.showCreateMentorModal = function() {
      $modal.open({
        templateUrl : 'components/create-mentor/create-mentor-modal.html',
        controller  : 'CreateMentorCtrl'
      });
    };
  }
]);
