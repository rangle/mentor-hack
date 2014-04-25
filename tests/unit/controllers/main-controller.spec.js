describe("Unit: Testing Controllers", function () {

  beforeEach(angular.mock.module('app'));

  it('should have a myCtrl controller', function () {
    expect(1).not.to.equal(null);
  });

  it('should have a properly working myCtrl controller', inject(function (
    $rootScope, $controller) {
    var $scope = $rootScope.$new();

    //we're stubbing the onReady event
    $scope.onReady = function () {};

    var ctrl = $controller('myCtrl', {
      $scope: $scope
    });

    expect($scope.testVar).to.equal('testVar');
  }));

});