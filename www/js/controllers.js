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

.controller('NewCounterCtrl', function($scope, NewCounter) {

      $scope.CreateNewCounter = function(){
        var name = $scope.newCounter.name.$viewValue;
        var initial = $scope.newCounter.initial.$viewValue;
        var maxValue = $scope.newCounter.maxValue.$viewValue;
        var increment = $scope.newCounter.increment.$viewValue;
        var dateCreated = new Date.now();
        var location = $scope.newCounter.location;
        var sound = $scope.newCounter.sound;
        var vibration = $scope.newCounter.vibration;
        //var color = $scope.newCounter.color;
        var color = "#FFF";

        // Counter object with all arguments
        var cntObj = {
          name: name,
          initial: initial,
          maxValue: maxValue,
          increment: increment,
          dateCreated: dateCreated,
          location: location,
          sound: sound,
          vibration: vibration,
          color: color
        };

          NewCounter.create(cntObj).then(function(){
              console.log("New Counter added");
          });


      };


})

.controller('CounterCtrl', function($scope, $stateParams) {
});
