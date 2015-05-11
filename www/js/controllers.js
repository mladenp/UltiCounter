angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CountersCtrl', function($scope) {

})

.controller('NewCounterCtrl', function($scope) {

      $scope.CreateNewCounter = function(){
        var cName = $scope.newCounter.name.$viewValue;
        var cInitial = $scope.newCounter.initial.$viewValue;
        var cIncrement = $scope.newCounter.increment.$viewValue;
        var cMaxValue = $scope.newCounter.maxValue.$viewValue;
        var cLocation = $scope.newCounter.location;
        console.log($scope.newCounter.location);
      };


})

.controller('CounterCtrl', function($scope, $stateParams) {
});
