'use strict';

/**
 * Login controller.
 */
angular.module('timaxjsClientApp')
    .controller('LoginController', function ($scope, $element, identityproviderService, close) {
        $scope.hasError = false;
        $scope.credentials = {
            email: '',
            password: ''
        };

        $scope.login = function () {
            identityproviderService.getToken($scope.credentials)
                .then(function () {
                    $element.modal('hide');
                    close(true, 500);
                }, function () {
                    $scope.hasError = true;
                });
        };

        $scope.close = function (result) {
            close(result, 500);
        };
    });