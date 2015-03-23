// Public/Views/views.js=====================-->
angular.module('views', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        
        $routeProvider

        // Patient list and home
        .when('/', {
            templateUrl: '/Views/PatientList.html',
            controller: 'mainController'
        })

        // New Patient
        .when('/NewPatient', {
            templateUrl: '/Views/NewPatient.html',
            controller: 'mainController'
        })
        //messaging
        .when('/Messaging', {
            templateUrl: '/Views/Messaging.html',
            controller: 'mainController'
        });

        $locationProvider.html5Mode(true);
    }]);
