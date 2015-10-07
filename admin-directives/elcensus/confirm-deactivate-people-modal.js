angular.module('avAdmin')
  .controller('ConfirmDeactivatePeopleModal',
    function($scope, $modalInstance, election, numSelectedShown) {
      $scope.election = election;
      $scope.numSelectedShown = numSelectedShown;
      $scope.ok = function () {
        $modalInstance.close();
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    });
