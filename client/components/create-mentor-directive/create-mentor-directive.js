angular.module('app')

.directive('createMentor', ['$modal',
  function($modal) {

    return{
      restrict: 'A',
      scope:{
        edit: '='
      },
      link: function (scope, element, attrs){

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

  //This controller is specifically tied to the Create/Edit Mentor Modal
.controller('CreateMentorCtrl', function($scope, $modalInstance, koast, mentor, $rootScope, $upload){

    //This function tells the controller to update the list via an emit, used when adding or deleting mentors
    var updateMentorList = function(){
      $rootScope.$emit('updateMentorList');
    };

    $scope.mentorTypes = [
      {type: 'developer', label: 'Developer'},
      {type: 'clinician', label: 'Clinical Expert'},
      {type: 'designer', label: 'Designer'},
      {type: 'healthcare admin', label: 'Health Care Administrator'},
      {type: 'business', label: 'Business/Legal'}
    ];
    $scope.mentor = {
      skills : [''],
      isMentor: true
    };

    //If this is true, then we are in edit mode - $scope.mentor should be tied to the passed in mentor and
    //The option to delete mentors should be present
    if(mentor){
      $scope.mentor = mentor;
      $scope.deleteAvailable = true;
    }

    $scope.saveMentor = function() {
      //If 'mentor' exists, then it means that this directive is being used for editing
      if(mentor){
        $scope.mentor.save();
        $modalInstance.dismiss();
        console.log('updated mentor');

        //If 'mentor' does not exist, it mean that this is currently is 'create new mentor' mode
      }else{
        koast.createResource('users', $scope.mentor).then(function(){
          console.log('created new mentor!');
          updateMentorList();
          $modalInstance.dismiss();
        })
      }
    };

    $scope.deleteMentor = function(){
      $scope.mentor.delete();
      console.log('Mentor Deleted!!!!!');
      updateMentorList();
      $modalInstance.dismiss();
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



    var progressFn = function(evt) {
        var pct = parseInt(100.0 * evt.loaded / evt.total);
        //elem.attr('data-content', ['uploading ... ', pct, '%'].join(''));
      },
      errFn = function(data, status, headers, config) {
        console.error(data);
        $scope.uploading = false;

        //elem.attr('data-content', 'uploading');
      };
    
    $scope.uploading = false;

    $scope.onFileSelect = function($files) {
      $scope.uploading = true;
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var $file = $files[i];
        $scope.upload = $upload.upload({
          url: 'api/img-upload', //upload.php script, node.js route, or servlet url
          // method: POST or PUT,
          // headers: {'headerKey': 'headerValue'}, withCredential: true,
          data: {myObj: $scope.mentor},
          file: $file,
          
          //fileFormDataName: myFile,
          
          //formDataAppender: function(formData, key, val){} 
        }).progress(progressFn).success(function(data, status, headers, config) {
          // file is uploaded successfully
          $scope.$apply(function() {
            $scope.mentor.photo = data.file.url;
            $scope.uploading = false;
          });
        }).error(errFn)
        //.then(success, error, progress); 
      }
    };


    /*$scope.onFileSelect = function($files) {
      var file = $files[0];

      $upload.upload({url:'server/lib/imageUpload.js', method: 'POST', data: $scope.mentor, file: file})
        .progress(function(evt){

        }).success(function(response){

        });

//      var fr = new FileReader();

//      fr.onload = function() {
//        var img = new Image();
//        img.onload = function() {
//          var uploadBtn = document.getElementById('upload-button');
//          uploadBtn.style.backgroundImage = 'url(' + this.src + ')';
//        };
//
//        img.src = fr.result;
//      };

//      fr.readAsDataURL(file);
    };*/
  });
