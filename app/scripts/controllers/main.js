'use strict';

/**
 * Main controller.
 */
angular.module('timaxjsClientApp')
    .controller('MainCtrl', function ($scope, ModalService) {

        $scope.showLoginDialog = function () {
            ModalService.showModal({
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    // $scope.message = result ? 'You said Yes' : 'You said No';
                    console.log(result);
                });
            });
        };
    });
