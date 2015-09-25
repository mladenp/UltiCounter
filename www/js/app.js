// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

        });
    })


    .config(function ($stateProvider, $ionicConfigProvider, $urlRouterProvider) {

        $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);


        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.new-counter', {
                url: "/new-counter",
                views: {
                    'menuContent': {
                        templateUrl: "templates/new-counter.html",
                        controller: 'NewCounterCtrl'
                    }
                }
            })

            .state('app.counters', {
                url: "/counters",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/counters.html",
                        controller: 'CountersCtrl'
                    }
                }
            })

            .state('app.counter', {
                url: "/counter/:counterID",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/counter.html",
                        controller: 'CounterCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/counters');
    });
