/**
 * Created by della on 2014-05-01.
 */

angular.module('app')

.directive('createTeam', function($modal){

    return{
      restrict: 'A',
      link: function(scope, element, attrs){

        var showTeamModal = function() {
          $modal.open({
            templateUrl : '/client/components/team-directive/team-modal.html',
            controller  : 'teamModalCtrl'
          });
        };

        element.on('click', showTeamModal);

      }
    }
  })

.controller('teamModalCtrl', function($scope, $modalInstance){

    $scope.team = {};

  });