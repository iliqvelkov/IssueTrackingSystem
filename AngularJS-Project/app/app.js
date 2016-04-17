'use strict';

var app = angular.module('issueTracking', ['ngRoute', 'ngResource', 'ngStorage']);

app.constant({
    'baseServiceUrl': 'https://softuni-issue-tracker.azurewebsites.net/api'
})
    .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home-view.html',
            controller: 'AuthenticationController'
        })
        .when('/dashboard', {
            templateUrl: 'app/views/dashboard-view.html',
            controller: 'HomeController'
        })
        .when('/logout', {
            templateUrl: 'app/views/home-view.html',
            controller: 'AuthenticationController'
        })
        .otherwise({
            redirectTo: '/'
        });
}])
    .run(function ($rootScope, $location, authentication) {
    $rootScope.$on('$locationChangeStart', function (event) {
        var isRegisterPage = $location.path().indexOf('/register') == -1,
            isLoginPage = $location.path().indexOf('/login') == -1,
            isHomePage = $location.path().indexOf('/') > -1 && $location.path().length == 1,
            isLoggedIn = authentication.isLoggedIn();

        if (!isLoggedIn && (!isHomePage && isRegisterPage && isLoginPage)) {
            $location.path("/");
        } else if (isLoggedIn && (!isRegisterPage || !isLoginPage)) {
            $location.path("/");
        }
    });
});

