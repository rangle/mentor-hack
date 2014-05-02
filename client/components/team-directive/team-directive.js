/**
 * Created by della on 2014-05-01.
 */

angular.module('app')

.directive('createTeam', function($modal){

    return{
      restrict: 'A',
      scope:{
        edit: '='
      },
      link: function(scope, element, attrs){

        var showTeamModal = function() {
          $modal.open({
            templateUrl : '/client/components/team-directive/team-modal.html',
            controller  : 'teamModalCtrl',
            resolve: {
              team: function(){
                return scope.edit;
              }
            }
          });
        };

        element.on('click', showTeamModal);

      }
    }
  })

.controller('teamModalCtrl', function($scope, $rootScope, $modalInstance, team, koast, server){

    $scope.team = {};

    var updateTeamList = function(){
      $rootScope.$emit('updateTeamList');
    };


    if(team){
      $scope.team = team;
      $scope.deleteable = true;
    }

    $scope.deleteTeam = function(){
      $scope.team.delete();
      updateTeamList();
      $modalInstance.dismiss();
    };

    $scope.saveTeam = function () {
      if(team){
        $scope.team.save();
        $modalInstance.dismiss();
      }else{
        koast.createResource('teams', $scope.team).then(function () {
          return koast.queryForResources('teams', {displayName: $scope.team.displayName});
        }).then(function(team){
          updateTeamList();
//          server.teams.push(team[0]); //Todo: very hacky, queried instead of get - but gets aren't working
          $modalInstance.dismiss();
        })
      }
    }

  });