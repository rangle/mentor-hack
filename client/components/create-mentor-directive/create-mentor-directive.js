angular.module('app')

.directive('createMentor', ['$modal',
  function($modal) {

    return{
      restrict: 'A',
      scope:{
        edit: '='
      },
      link: function(scope, element, attrs){

        var showCreateMentorModal = function() {
          $modal.open({
            templateUrl : '/client/components/create-mentor-directive/create-mentor-modal.html',
            controller  : 'CreateMentorCtrl',
            resolve: {
              mentor: function(){
                return scope.edit;
              }
            }
          });
        };

        element.on('click', showCreateMentorModal);

      }
    }

  }])

.controller('CreateMentorCtrl', function($scope, $modalInstance, koast, mentor){

    $scope.mentorTypes = [
      {type: 'developer', label: 'Developer'},
      {type: 'clinitian', label: 'Clinical Expert'},
      {type: 'designer', label: 'Designer'}
    ];
    $scope.mentor = {
      skills : [''],
      isMentor: true
    };

    if(mentor){
      $scope.mentor = mentor;
    }

    $scope.saveMentor = function() {
      if(mentor){
        $scope.mentor.save();
        $modalInstance.dismiss();
        console.log('updated mentor');
      }else{
        koast.createResource('users', $scope.mentor).then(function(){
          console.log('created new mentor!');
          $modalInstance.dismiss();
        })
      }
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
    };

    $scope.isLastItem = function(idx, len) {
      return idx + 1 == len;
    };

    $scope.modifySkillSet = function(idx, len) {
      if($scope.isLastItem(idx, len)) {
        $scope.mentor.skills.push('');
      } else {
        $scope.deleteSkill(idx);
      }
    };

    $scope.deleteSkill = function(idx) {
      // deletes value at idx
      $scope.mentor.skills.splice(idx, 1);
    };

    $scope.onFileSelect = function($files) {
      var file = $files[0];
      var fr = new FileReader();

      fr.onload = function() {
        var img = new Image();
        img.onload = function() {
          var uploadBtn = document.getElementById('upload-button');
          uploadBtn.style.backgroundImage = 'url(' + this.src + ')';
        };

        img.src = fr.result;
      };

      fr.readAsDataURL(file);
    };
  });
