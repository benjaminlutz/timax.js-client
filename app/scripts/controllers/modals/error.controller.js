(function () {
    'use strict';

    /**
     * Error controller.
     */
    angular.module('timax.controllers.modals.error', [])

        .controller('ErrorController', function ($scope, $element, error, close) {
            $scope.messageText = error.message;
            $scope.errorObject = error.error;

            $scope.close = function (result) {
                close(result, 500);
            };

            $scope.isValidationError = function () {
                return $scope.errorObject.name === 'ValidationError';
            };
        });
})();