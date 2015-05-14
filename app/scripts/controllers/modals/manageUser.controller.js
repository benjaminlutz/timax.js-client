(function () {
    'use strict';

    /**
     * Manage user controller.
     */
    angular.module('timax.controllers.modals.manageUser', ['timax.services.user'])

        .controller('ManageUserController', function ($scope, $element, userService, project, close) {
            $scope.project = project;

            $scope.selected = undefined;

            $scope.addButtonDisabled = function () {
                return angular.isObject($scope.selected) === false;
            };

            $scope.getUser = function (searchString) {
                return userService.searchUser(searchString);
            };

            $scope.close = function (result) {
                close(result, 500);
            };
        });
})();