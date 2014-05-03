/* globals angular */

/*
 * Defines a directive that display's a mentors profile.
 */

angular.module('app.components.mentor-schedule-directive', [
  'app.components.mentor-schedule'
])

.directive('mentorSchedule', ['schedule', '$log', '$rootScope',
  function (schedule, $log, $rootScope) {
    'use strict';
    var directive = {
      restrict: 'A',
      templateUrl: 'client/components/mentor-schedule/mentor-schedule.html',
      scope: {
        'mentor': '=mentorSchedule',
        'teams': '=teams'
      }
    };

    directive.link = function (scope, element, attrs) {

      scope.schedule = schedule.getScheduleForMentor(scope.mentor);

      scope.mentor.ui = {
        "scheduleShown": true
      };

      scope.toggleScheduleShown = function () {
        scope.mentor.ui.scheduleShown = !scope.mentor.ui.scheduleShown;
      };

      scope.taken = function (team) {
        if (!team.team._id) {
          return;
        } else if (['Lunch', 'Dinner', 'Not Available'].indexOf(team.team.displayName) >= 0) {
          return 'break';
        }else if (['Available', 'Free'].indexOf(team.team.displayName) >= 0) {
          return 'free';
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

      scope.isAuthenticated = function() {
        console.log("$rootScope.isAuthenticated", $rootScope.isAuthenticated);
        return $rootScope.isAuthenticated;
      }
    };

    return directive;
  }
]);