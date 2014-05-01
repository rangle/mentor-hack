/* globals angular */

/*
 * Defines a directive that display's a mentors profile.
 */

angular.module('app.components.mentor-schedule', [
  'app.server'
])

.service('schedule', ['server',
  function(server) {
    'use strict';
    var service = {};
    var numSlots = 9;

    function getHourLabel(hour, startTime) {
      hour += startTime;
      if (hour < 12) {
        return hour + 'am';
      } else if (hour === 12) {
        return '12pm';
      } else {
        return (hour - 12) + 'pm'
      }
    }

    function getTeamsById() {
      var byId = {};
      server.teams.forEach(function(team) {
        byId[team._id] = team;
      });
      return byId;
    }

    service.getScheduleForMentor = function(mentor) {
      var schedule = {};
      var teamsById = getTeamsById();

      // Define the slots.
      schedule.slots = [];
      for (var i=0; i<numSlots; i++) {
        var slot = {
          index: i
        };
        var bookedTeamId = mentor.bookings[i];

        if (bookedTeamId) {
          slot.team = teamsById[bookedTeamId] || {
            displayName: '???????'
          }
        } else {
          slot.team = {}
        };

        slot.label = getHourLabel(i, 10); // Start at 10am for now.
        schedule.slots.push(slot);
      }

      // Add a function to book a team. Returns a promise.
      schedule.book = function(slot, team) {
        slot.team = team;
        mentor.bookings[slot.index] = team._id;
        mentor.isMentor = true;
        return mentor.save();
      };

      return schedule;
    };

    return service;
  }
]);