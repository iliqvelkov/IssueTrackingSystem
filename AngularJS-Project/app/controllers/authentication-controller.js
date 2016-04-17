/**
 * Created by ILIYA on 4/11/2016.
 */
app.controller('AuthenticationController',
    function ($scope, $location, $rootScope, authentication, $localStorage) {
        $scope.isLogged = authentication.isLoggedIn();
        if ($scope.isLogged) {
            $scope.userData = function () {
                authentication.getCurrentUserData()
                    .then( function (userData) {

                        },
                        function (error) {
                            console.log(error)
                        }
                    );
            }
        }

        $scope.register = function (userData) {
            authentication.register(userData).then(
                function success(serverData) {
                    authentication.setCredentials(serverData.data);
                    $location.path("/dashboard");
                },
                function error(error) {
                    console.log(error)
                }
            );
        };

        $scope.login = function (userData) {

            authentication.login(userData).then(
                function success(serverData) {
                    authentication.setCredentials(serverData.data);
                    $location.path("/dashboard");
                },
                function error(error) {
                    console.log(error)
                }
            );
        };

        $scope.logout = function () {
            authentication.logout().then(
                function success(serverData) {
                    authentication.clearCredentials(serverData.data);
                    $location.path('/');
                },
                function error(error) {
                    console.log(error)
                }
            );
        };
    });