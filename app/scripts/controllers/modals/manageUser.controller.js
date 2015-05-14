(function () {
    'use strict';

    /**
     * Manage user controller.
     */
    angular.module('timax.controllers.modals.manageUser', [])

        .controller('ManageUserController', function ($scope, $element, project, close) {
            $scope.project = project;

            $scope.close = function (result) {
                close(result, 500);
            };
        });
})();