(function () {
    'use strict';

    /**
     * Main controller.
     */
    angular.module('timax.controllers', ['angularModalService', 'timax.controllers.modals'])

        .controller('StartController', function ($scope, ModalService) {
            $scope.showLoginDialog = function () {
                ModalService.showModal({
                    templateUrl: 'views/modals/login.html',
                    controller: 'LoginController'
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        // TODO reload page, navigate to some place or just do change something in the view...
                        console.log(result);
                    });
                });
            };
        });
})();