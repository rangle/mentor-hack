/**
 * Created by della on 2014-04-25.
 */

angular.module('app')
.service('Users', [function () {
}])

  .factory('unTaggedStore',['$firebase', function($firebase){

    var ref = new Firebase('');

    return $firebase(ref);
  }]);