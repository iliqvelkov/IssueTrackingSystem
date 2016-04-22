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
                    notifyService.success('success registration');
                },
                function error(error) {
                    notifyService.error('User already exist or missing requirements', error);
                }
            );
        };

        $scope.login = function (userData) {

            authenticationService.login(userData)
                .then(function success(serverData) {
                    notifyService.success('Welcome');
                    $location.path("/dashboard");
                }, function error(error) {
                    notifyService.error('Login failed', error)
                });
        };

        $scope.logout = function () {
            authenticationService.logout().then(
                function success(serverData) {
                    authenticationService.clearCredentials();
                    notifyService.success('logout success');
                    $location.path('/');
                },
                function error(error) {
                    notifyService.error('logout failed', error);
                }
            );
        };

        $scope.changePassword = function (userData) {
            authenticationService.changePassword(userData).then(
                function success() {
                    notifyService.success('Change password success!');
                    $location.path('/dashboard');
                },
                function error(error) {
                    notifyService.error('unable to change password!' + error);
                }
            )
        }
    });