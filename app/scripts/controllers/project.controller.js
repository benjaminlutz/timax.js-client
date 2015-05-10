(function () {
    'use strict';

    /**
     * Project controller.
     */
    angular.module('timax.controllers.project', ['timax.services.project'])

        .controller('ProjectController', function ($scope, authorizedUser, projects, projectService) {
            $scope.projectIdPattern = /^P00[0-9]{3}/;

            $scope.projects = projects;

            $scope.newProject = {
                project_id: '',
                description: ''
            };

            $scope.canCreateNewProjects = function () {
                return authorizedUser.role === 'admin';
            };

            $scope.saveNewProject = function () {
                projectService.saveNewProject($scope.newProject).then(function (savedProject) {
                    $scope.projects.push(savedProject);
                    $scope.newProject.project_id = '';
                    $scope.newProject.description = '';
                });
            };
        });
})();