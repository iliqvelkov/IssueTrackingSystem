'use strict';

angular.module('issueTracking', [
    'ngRoute',
    'issueTracking.home'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
}])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/');
