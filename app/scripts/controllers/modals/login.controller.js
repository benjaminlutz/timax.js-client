(function () {
    'use strict';

    /**
     * Login controller.
     */
    angular.module('timax.controllers.modals.login', ['timax.services.identityProvider'])

        .controller('LoginController', function ($scope, $element, identityProviderService, close) {
            $scope.hasError = false;
            $scope.credentials = {
                email: '',
                password: ''
            };

            $scope.login = function () {
                identityProviderService.getToken($scope.credentials)
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
})();