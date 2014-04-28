describe("Unit Testing schedule-controller", function () {

  beforeEach(angular.mock.module('app'));

  it('should have a ScheduleCtrl controller', function () {
    expect(1).not.to.equal(null);
  });

  it('should load a collection of teams', inject(function($rootScope, $controller){

    var $scope = $rootScope.$new();
    var ctrl = $controller('ScheduleCtrl', {
      $scope: $scope
    });

    expect($scope.teams).to.eventually.be.an('array');

  }))

});