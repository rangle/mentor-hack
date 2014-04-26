'use strict';

angular.module('app')
  .controller('ScheduleCtrl', function($scope, server) {
//    $scope.teams = [
//      'John',
//      'Jack',
//      'Mark',
//      'Ernie',
//      'Lunch',
//      'Dinner'
//    ];

    $scope.mentors = server.users;
    $scope.teams = server.teams;

    $scope.bookings = ['','','','','','','','',''];

    $scope.time = function (slot) {
      var time = 9 + 1 * slot+1;
      time = time > 12 ? time + ' pm' : time + ' am';
      return time;
    };

    $scope.taken = function (team) {
      if(team === '') return;
      else if(['Lunch', 'Dinner'].indexOf(team) >= 0) return 'break';
      else return 'taken';
    };

    // on-drop-success="dropSuccessHandler($event,$index,bookings)"
    $scope.dropSuccessHandler = function($event, index, array) {
      // array.splice(index, 1);
    };

    $scope.onDrop = function($event, index, $data) {
      if($scope.bookings[index] === '')
        $scope.bookings[index] = $data.displayName;
      else {
        var r = confirm('This is slot is already taken, do you want to overwrite it?');
        if (r)
          $scope.bookings[index] = $data.displayName;
      }
    };

  });