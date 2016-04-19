'use strict';

app.controller('AuthenticationController',
    function ($scope, $location, $rootScope, authenticationService, $localStorage) {
        
        $scope.isLogged = authenticationService.isLoggedIn;

        $scope.register = function (userData) {
            authenticationService.register(userData).then(
                function success(serverData) {
                    $scope.login({
                        username: userData.regEmail,
                        password: userData.regPassword
                    });
                },
                function error(error) {
                    console.log(error);
                }
            );
        };

        $scope.login = function (userData) {

            authenticationService.login(userData)
                .then(function success(serverData) {
                    $location.path("/dashboard");
                }, function error(error) {
                    console.log(error);
                });
        };

        $scope.logout = function () {
            authenticationService.logout().then(
                function success(serverData) {
                    authenticationService.clearCredentials();
                    $location.path('/');
                },
                function error(error) {
                    console.log(error);
                }
            );
        };
    });