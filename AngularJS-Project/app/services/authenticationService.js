'use strict';

app.factory('authenticationService', function ($http, baseServiceUrl, $localStorage) {
    var authenticationService = {};

    authenticationService.setCredentials = function (serverData) {
        $localStorage.currentUser = serverData;
    };

    authenticationService.clearCredentials = function () {
        $localStorage.$reset();
    };

    authenticationService.isLoggedIn = function () {
        return $localStorage.currentUser != undefined;
    };

    authenticationService.getHeaders = function () {
        return {
            Authorization: "Bearer " + $localStorage.currentUser.access_token
        };
    };
    
    authenticationService.getCurrentUserData = function () {
        return $http({
            method: 'GET',
            url: baseServiceUrl + 'users/me',
            headers: this.getHeaders()
        })
    };

    authenticationService.login = function (userData) {
        return $http({
            method: 'POST',
            url: baseServiceUrl + 'api/Token',
            data: "userName=" + userData.username + "&password=" + userData.password +
            "&grant_type=password"
        }).success(function (data) {
            var userData = data;

            var userInfoRequest = {
                method: 'GET',
                url: baseServiceUrl + 'users/me',
                headers: { Authorization: 'Bearer ' + userData.access_token }
            };

            $http(userInfoRequest).success(function () {
                $localStorage.currentUser = userData;
            })
        })
    };

    authenticationService.register = function (userData) {
        return $http({
            method: 'POST',
            url: baseServiceUrl + 'api/Account/register',
            data: {
                Email:userData.regEmail,
                Password: userData.regPassword,
                ConfirmPassword: userData.confirmPassword
            }
        })
    };

    authenticationService.logout = function () {
        return $http({
            method: 'POST',
            url: baseServiceUrl + 'api/Account/logout',
            headers: this.getHeaders()
        });
    };

    authenticationService.changePassword = function (userData) {
        console.log(userData);
        return $http({
            method: 'POST',
            url: baseServiceUrl + 'api/Account/ChangePassword',
            data: userData,
            headers: this.getHeaders()
        });
    };


    return authenticationService;
});