(function () {
    'use strict';

    /**
     * Project controller.
     */
    angular.module('timax.controllers.project', [])

        .controller('ProjectController', function ($scope, authorizedUser) {
            $scope.firstName = authorizedUser.firstName;
            $scope.lastName = authorizedUser.lastName;
        });
})();