'use strict';

app.controller('HomeController', ['$scope', 'authenticationService',
     function ($scope, authenticationService) {
     $scope.isLogged = authenticationService.isLoggedIn;
    
}]);