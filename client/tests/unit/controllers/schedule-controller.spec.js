describe("Unit Testing schedule-controller", function () {

  beforeEach(angular.mock.module('app'));

  it('should load a collection of teams', inject(function($rootScope, $controller, $injector){

    var $scope = $rootScope.$new();
    var ctrl = $injector('ScheduleCtrl', {
      $scope: $scope
    });

    expect($scope.teams).to.eventually.be.an('array');

  }))

});