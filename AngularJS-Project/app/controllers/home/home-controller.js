/**
 * Created by ILIYA on 4/11/2016.
 */
angular.module('issueTracking.home', ['issueTracking.users.authentication'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/views/home/home-view.html',
        controller: 'HomeCtrl'
    });
}])
.controller('HomeCtrl', ['$scope', '$location', '$authentication',
        function($scope, $location, $authentication) {
            $scope.login = function (user) {
                $authentication.loginUser(user)
                    .then(function(loggedInUser){
                        console.log(loggedInUser);
                        $location.path('/newsFeed');
                    });
            };

            $scope.register = function (user) {
                $authentication.registerUser(user)
                    .then(function(registeredUser) {
                        console.log(registeredUser);
                    });
            };
}]);