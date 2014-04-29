/**
 * Created by della on 2014-04-27.
 */


angular.module('app.components.directives', [])

.directive('mentorProfile', function(server){

    return{
      restrict: 'A',
      templateUrl: 'client/components/mentorDirective/mentorProfile.html',
      scope: {
        'mentor': '=mentorProfile',
        'teams': '=teams'
      },
      link: function(scope, element, attrs){

        scope.bookings = ['','','','','','','','',''];

        //Iterates over each booking currently on the mentor, and if not null (null means this spot is empty)
        //apply the booking to the overall scope.bookings, which is bound to the view
        scope.mentor.bookings.forEach(function(bookingSlot, idx){
          if(bookingSlot){
            scope.bookings[idx] = bookingSlot;
          }
        });

        scope.time = function (slot) {
          var time = 9 + 1 * slot+1;
          time = time > 12 ? time + ' pm' : time + ' am';
          return time;
        };

        scope.taken = function (team) {
          if(team === '') return;
          else if(['Lunch', 'Dinner'].indexOf(team) >= 0) return 'break';
          else return 'taken';
        };

        // on-drop-success="dropSuccessHandler($event,$index,bookings)"
        scope.dropSuccessHandler = function($event, index, array) {
          // array.splice(index, 1);
//          server.users.push()
        };

        console.log(server);
        scope.onDrop = function($event, index, $data) {
          if(scope.bookings[index] === '')
            scope.bookings[index] = $data.displayName;
          else {
            var r = confirm('This is slot is already taken, do you want to overwrite it?');
            if (r)
              scope.bookings[index] = $data.displayName;
          }
        };
      }
    }
  });