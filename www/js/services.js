angular.module('starter.services', [])

    .factory('Counter', function ($rootScope, $ionicPlatform) {

        function reminderSchedule(reminderID, every, countAtLeast, counterName) {

            var notificationText = "Remember to count at least " + countAtLeast + " " + counterName;

            cordova.plugins.notification.local.schedule({
                id: reminderID,
                every: every,
                text: notificationText
            });
        }

        function reminderCancel(reminderID) {
            cordova.plugins.notification.local.cancel(reminderID, function () {
                console.log("Notification canceled");
            });
        }

        // Create new counter and stringify it into LocalStorage
        function createCounter(cntObj) {

            var counterString = JSON.stringify(cntObj);
            var counterStorageID = cntObj.dateCreated;
            localStorage.setItem(counterStorageID, counterString);

        }

        // Return single counter parsed object
        function getCounterByID(counterID) {
            return JSON.parse(localStorage.getItem(counterID));
        }

        // Loop through whole LocalStorage and return parsed array of objects
        function getAllCounters() {
            var localStorageSize = localStorage.length;
            var countersAll = [];

            for (var i = 0; i < localStorageSize; ++i) {
                countersAll[i] = localStorage.getItem(localStorage.key(i));
                countersAll[i] = JSON.parse(countersAll[i]);
                console.log(countersAll[i]);
            }

            return countersAll;
        }

        // Update single counter
        function updateCount(cntObj) {
            var counterID = cntObj.dateCreated;
            var serializedObj = JSON.stringify(cntObj);
            localStorage.setItem(counterID, serializedObj);
        }

        function watchLocation() {

            watchPosID = null;

            var onSuccess = function (pos) {
                console.log("GeoLocation");
                $rootScope.myLocation = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                };
            };

            function onError(error) {
                console.log(error);
                window.plugins.toast.showLongTop("You need to turn GPS ON to find your location");

            }

            var geolocArgs = {
                maximumAge: 8000,
                timeout: 45000,
                throttleTime: 8000, // geolocation-throttle.js lib option
                enableHighAccuracy: true
            };

            if (watchPosID == null) {
                var watchPosID = GeolocationThrottle.watchPosition(onSuccess, onError, geolocArgs);
            }

            // On PAUSE
            document.addEventListener("pause", onPause, false);

            function onPause() {
                GeolocationThrottle.clearWatch(watchPosID);
                console.log("App pause!");
            }

            // On RESUME
            document.addEventListener("resume", onResume, false);

            function onResume() {
                $ionicPlatform.ready(function () {
                    watchPosID = GeolocationThrottle.watchPosition(onSuccess, onError, geolocArgs);
                    console.log("on resume");
                });
            }

        }

        return {
            create: createCounter,
            get: getCounterByID,
            getAll: getAllCounters,
            update: updateCount,
            reminder: reminderSchedule,
            reminderCancel: reminderCancel,
            watchLocation: watchLocation
        }

    });


