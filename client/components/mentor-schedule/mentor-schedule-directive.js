/* globals angular */

/*
 * Defines a directive that display's a mentors profile.
 */

angular.module('app.components.mentor-schedule-directive', [
  'app.components.mentor-schedule'
])

.directive('mentorSchedule', ['schedule', '$log',
  function (schedule, $log) {
    'use strict';
    var directive = {
      restrict: 'A',
      templateUrl: 'client/components/mentor-schedule/mentor-schedule.html',
      scope: {
        'mentor': '=mentorSchedule',
        'teams': '=teams'
      },
    };

    directive.link = function (scope, element, attrs) {

      scope.schedule = schedule.getScheduleForMentor(scope.mentor);

      scope.taken = function (team) {
        if (team === '') {
          return;
        } else if (['Lunch', 'Dinner'].indexOf(team) >= 0) {
          return 'break';
        } else {
          return 'taken';
        }
      };

      scope.onDrop = function ($event, index, $data) {
        var slot = scope.schedule.slots[index];
        var message = 'This is slot is already taken, do you want to overwrite it?';

        if (!slot.team._id || confirm(message)) {
          scope.schedule.book(slot, $data)
            .then(null, $log.error);
        }
      };
    };

    return directive;
  }
]);