angular.module('app')

.controller('CreateMentorCtrl', ['$scope', '$modalInstance',

  function($scope, $modalInstance) {

    $scope.mentorTypes = ["Designer", "Developer", "Doctor-Person"];
    $scope.skills = [''];
    
    $scope.saveMentor = function() {
    
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
    };

    $scope.isLastItem = function(idx, len) {
      return idx + 1 == len;
    };

    $scope.modifySkillSet = function(idx, len) {
      if($scope.isLastItem(idx, len)) {
        $scope.skills.push('');
      } else {
        $scope.deleteSkill(idx);
      }
    };

    $scope.deleteSkill = function(idx) {
      $scope.skills.splice(idx, 1);
    };

  }]);
