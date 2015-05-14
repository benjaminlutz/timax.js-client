(function () {
    'use strict';

    /**
     * Manage user controller.
     */
    angular.module('timax.controllers.modals.manageUser', ['timax.services.user', 'timax.services.project'])

        .controller('ManageUserController', function ($scope, $element, userService, projectService, project, close) {
            $scope.project = project;

            $scope.selected = undefined;

            $scope.addButtonDisabled = function () {
                return angular.isObject($scope.selected) === false;
            };

            $scope.getUser = function (searchString) {
                return userService.searchUser(searchString);
            };

            $scope.close = function (result) {
                $element.modal('hide');
                close(result, 500);
            };

            $scope.addUser = function () {
                projectService.addUserToProject($scope.selected._id, $scope.project._id).then(function () {
                    $scope.project.users.push($scope.selected);
                    $scope.selected = undefined;
                });
            };

            $scope.removeUser = function (userId) {
                projectService.deleteUserFromProject(userId, $scope.project._id).then(function () {
                    for (var i = 0; i < $scope.project.users.length; i++) {
                        var user = $scope.project.users[i];
                        if (user._id === userId) {
                            $scope.project.users.splice($scope.project.users.indexOf(user), 1);
                        }
                    }
                });
            };
        });
})();