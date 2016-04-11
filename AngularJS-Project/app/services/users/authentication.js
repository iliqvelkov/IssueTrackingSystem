/**
 * Created by ILIYA on 4/11/2016.
 */
angular.module('issueTracking.users.authentication', [])
    .factory('$authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL) {

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'Account/Register', user)
                    .then(function(response) {
                        deferred.resolve(response.data);
                    }, function(error) {

                    });

                return deferred.promise;
            }

            function loginUser(user) {
                user.grant_type = 'password';
                var deferred = $q.defer();

                $http({
                    url: BASE_URL + 'Token',
                    method: 'POST',
                    data: "userName=" + user.username + "&password=" + user.password +
                    "&grant_type=password"
                }).then(function (response) {
                },function (error) {});

                return deferred.promise;
            }

            function logout() {

            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout
            }
        }]);