(function () {
    'use strict';

    /**
     * Main controller.
     */
    angular.module('timax.controllers.start', ['angularModalService', 'timax.controllers.modals.login', 'timax.services.authorisation'])

        .controller('StartController', function ($scope, $route, $window, ModalService, authorisationService) {

            $scope.isLoggedIn = authorisationService.getPrincipal();

            $scope.showLoginDialog = function () {
                ModalService.showModal({
                    templateUrl: 'views/modals/login.html',
                    controller: 'LoginController'
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function () {
                        $window.location.reload();
                    });
                });
            };
        });
})();