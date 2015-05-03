'use strict';

/**
 * Login controller.
 */
angular.module('timaxjsClientApp')
    .controller('LoginController', function ($scope, identityproviderService, close) {

        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.login = function () {
            identityproviderService.getToken($scope.credentials)
                .then(function (response) {
                    console.log(response.token);
                }, function (reason) {
                    console.log(reason);
                });
        };

        $scope.close = function (result) {
            close(result, 500);
        };

    });