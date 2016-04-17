/**
 * Created by ILIYA on 4/11/2016.
 */
app.controller('HomeController', ['$scope', 'authentication',
    function ($scope, authentication) {
    $scope.isLogged = authentication.isLoggedIn();

}]);