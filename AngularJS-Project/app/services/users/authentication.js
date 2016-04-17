'use strict';

app.factory('authentication', function ($http, baseServiceUrl, $localStorage) {
    var authentication = {};

    authentication.setCredentials = function (serverData) {
        $localStorage.currentUser = serverData;
    };

    authentication.clearCredentials = function () {
        $localStorage.$reset();
    };

    authentication.isLoggedIn = function () {
        return $localStorage.currentUser != undefined;
    };

    authentication.getHeaders = function () {
        return {
            Authorization: "Bearer " + $localStorage.currentUser.access_token,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
    };

    authentication.getCurrentUserData = function () {
        return $http({
            method: 'GET',
            url: baseServiceUrl + '/me',
            headers: this.getHeaders()
        })
    };

    authentication.login = function (userData) {
        return $http({
            method: 'POST',
            url: baseServiceUrl + '/Token',
            data: "userName=" + userData.username + "&password=" + userData.password +
            "&grant_type=password"
        })
    };

    authentication.register = function (userData) {
        return $http({
            method: 'POST',
            url: baseServiceUrl + '/Account/register',
            data: {
                Email:userData.regEmail,
                Password: userData.regPassword,
                ConfirmPassword: userData.confirmPassword
            }
        })
    };

    authentication.logout = function () {
        return $http({
            method: 'POST',
            url: baseServiceUrl + '/Account/logout',
            headers: this.getHeaders()
        });
    };

    return authentication;
});