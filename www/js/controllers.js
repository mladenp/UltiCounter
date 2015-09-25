angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    })

    .controller('CountersCtrl', function ($ionicPlatform, $timeout, $scope, Counter) {

        $ionicPlatform.ready(function () {

            $scope.counters = Counter.getAll();

            console.log($scope.counters);

        });

    })

    .controller('CounterCtrl', function ($scope, $rootScope, $stateParams, Counter) {


        $scope.counter = Counter.get($stateParams.counterID);

        if ($scope.counter.location) {
            Counter.watchLocation();
        }


        $scope.counterMinus = function (counterID) {

            var cntObj = Counter.get(counterID);

            cntObj.currentValue = parseInt(cntObj.currentValue) - parseInt(cntObj.increment);

            Counter.update(cntObj);

        };

        $scope.counterPlus = function (counterID) {

            var cntObj = Counter.get(counterID);

            cntObj.currentValue = parseInt(cntObj.currentValue) + parseInt(cntObj.increment);

            var singleCount = {};
            singleCount.count = cntObj.currentValue;
            if (cntObj.location) {
                singleCount.lat = $rootScope.myLocation.latitude;
                singleCount.lng = $rootScope.myLocation.longitude;
            }


            cntObj.values[cntObj.values.length] = singleCount;
            console.log(cntObj.values[0]);


            Counter.update(cntObj);
        };

    })

    .controller('NewCounterCtrl', function ($scope, Counter) {

        $scope.CreateNewCounter = function () {

            var name = $scope.newCounter.name.$viewValue;

            if ($scope.newCounter.initial.$viewValue !== undefined) {
                var initial = $scope.newCounter.initial.$viewValue;
            } else {
                var initial = 0;
            }

            if ($scope.newCounter.maxValue.$viewValue !== undefined) {
                var maxValue = $scope.newCounter.maxValue.$viewValue;
            } else {
                var maxValue = 0;
            }

            if ($scope.newCounter.increment.$viewValue !== undefined) {
                var increment = $scope.newCounter.increment.$viewValue;
            } else {
                var increment = 1;
            }

            var dateCreated = Date.now();

            var location = $scope.newCounter.location;
            var sound = $scope.newCounter.sound;
            var vibration = $scope.newCounter.vibration;

            //var color = $scope.newCounter.color;
            var color = $scope.newCounter.color;
            var currentValue = 0;
            var values = [];

            var reminder = $scope.newCounter.reminder;

            console.log(reminder);

            // If Reminder is turned ON for this counter
            if (reminder) {
                var reminderID = dateCreated; // reminderID == counterID == dateCreated
                var remindEvery = $scope.newCounter.remindEvery;
                var countAtLeast = $scope.newCounter.countAtLeast;

                // Schedule Reminder
                Counter.reminder(reminderID, remindEvery, reminderCount, countAtLeast, name);

                // Add reminder countAtLeast & remindEvery to counter object for storage
                var reminderValue = {
                    countAtLeast: countAtLeast,
                    remindEvery: remindEvery
                }
            }


            // Create Counter Object with all parameters
            var cntObj = {
                name: name, // User given counter name
                initial: initial, // Starting counter value
                maxValue: maxValue, // Maximum allowed value
                increment: increment, // By how much to increase value by each count
                dateCreated: dateCreated, // Timestamp when counter is first created. Also Unique ID for Counter
                location: location, // GPS location toggle
                sound: sound, // Sound toggle
                vibration: vibration, // Vibration toggle
                color: color, // Color of counter
                currentValue: currentValue, // Latest value of counter
                values: values, // All counts with timestamp and GPS coordinates
                reminder: reminderValue // countAtLeast & remindEvery
            };

            Counter.create(cntObj);

        };

    });
