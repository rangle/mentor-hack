/**
 * Created by della on 2014-05-02.
 */

angular.module('app')

.filter('mentor', function(){
    var mentorTypes = [
      {type: 'developer', label: 'Developer'},
      {type: 'clinician', label: 'Clinical Expert'},
      {type: 'designer', label: 'Designer'},
      {type: 'healthcareAdmin', label: 'Health Care Administrator'},
      {type: 'business', label: 'Business/Legal'}
    ];

    return function(mentorRole){

      if(_.findWhere(mentorTypes, {type: mentorRole})){
        return _.findWhere(mentorTypes, {type: mentorRole}).label;
      }else{
        return mentorRole;
      }
    }
  });