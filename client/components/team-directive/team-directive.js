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

.controller('teamModalCtrl', function($scope, $modalInstance, koast, server){

    $scope.team = {};

    $scope.saveTeam = function () {
      koast.createResource('teams', $scope.team).then(function () {

        return koast.queryForResources('teams', {displayName: $scope.team.displayName});

      }).then(function(team){
        server.teams.push(team[0]); //Todo: very hacky, queried instead of get - but gets aren't working
        $modalInstance.dismiss();
      })
    }

  });