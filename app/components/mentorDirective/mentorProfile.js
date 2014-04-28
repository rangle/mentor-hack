/**
 * Created by della on 2014-04-27.
 */


angular.module('app.components.directives', [])

.directive('mentorProfile', function(){

    return{
      restrict: 'A',
      templateUrl: 'app/components/mentorDirective/mentorProfile.html',
      transclude: true,
      link: function(scope, element, attrs){

      }
    }
  });