/**
 * Created by della on 2014-04-27.
 */


angular.module('App')

.directive('mentorProfile', function(){

    return{
      restrict: 'A',
      templateUrl: 'mentorProfile.html',
      transclude: true,
      link: function(scope, element, attrs){

      }
    }
  });