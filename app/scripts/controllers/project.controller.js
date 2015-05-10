(function () {
    'use strict';

    /**
     * Project controller.
     */
    angular.module('timax.controllers.project', [])

        .controller('ProjectController', function ($scope, authorizedUser, projects) {
            $scope.projects = projects;
        });
})();