'use strict';

app.controller('AuthenticationController',
    function ($scope, $location, $rootScope, authenticationService, notifyService, $localStorage) {
        
        $scope.isLogged = authenticationService.isLoggedIn;

        $scope.register = function (userData) {
            authenticationService.register(userData).then(
                function success(serverData) {
                    $scope.login({
                        username: userData.regEmail,
                        password: userData.regPassword
                    });
                    notifyService.showInfo('success registration');
                },
                function error(error) {
                    notifyService.showError('User already exist or missing requirements', error);
                }
            );
        };

        $scope.login = function (userData) {

            authenticationService.login(userData)
                .then(function success(serverData) {
                    notifyService.showInfo('Welcome');
                    $location.path("/dashboard");
                }, function error(error) {
                    notifyService.showError('Login failed', error)
                });
        };

        $scope.logout = function () {
            authenticationService.logout().then(
                function success(serverData) {
                    authenticationService.clearCredentials();
                    notifyService.showInfo('logout success');
                    $location.path('/');
                },
                function error(error) {
                    notifyService.showError('logout failed', error);
                }
            );
        };
    });