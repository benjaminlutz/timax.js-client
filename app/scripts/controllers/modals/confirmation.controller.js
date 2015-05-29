(function () {
    'use strict';

    /**
     * Confirmation controller.
     */
    angular.module('timax.controllers.modals.confirmation', [])

        .controller('ConfirmationController', function ($scope, $element, message, close) {
            $scope.messageText = message;

            $scope.close = function (result) {
                $element.modal('hide');
                close(result, 500);
            };
        });
})();