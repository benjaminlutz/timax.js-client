'use strict';

/**
 * Login controller.
 */
angular.module('timaxjsClientApp')
    .controller('LoginController', function ($scope, close) {

        $scope.close = function (result) {
            close(result, 500);
        };

    });