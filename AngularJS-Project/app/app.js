'use strict';

var app = angular.module('issueTracking', ['ngRoute', 'ngResource', 'ngStorage']);

app.constant({
    'baseServiceUrl': 'https://softuni-issue-tracker.azurewebsites.net/'
});


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'AuthenticationController'
        })
        .when('/dashboard', {
            templateUrl: 'app/views/dashboard.html',
            controller: 'HomeController'
        })
        .when('/Account/ChangePassword',{
            templateUrl: 'app/views/change-password.html',
            controller: 'AuthenticationController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);



