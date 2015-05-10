(function () {
    'use strict';

    /**
     * Project controller.
     */
    angular.module('timax.controllers.project', ['ui.bootstrap','timax.services.project'])

        .controller('ProjectController', function ($scope, authorizedUser, projects, projectService) {
            $scope.projectIdPattern = /^P00[0-9]{3}/;

            $scope.projects = projects.documents;
            $scope.totalItems = projects.totalPages * 10;
            $scope.currentPage = projects.nextPage > 1 ? projects.nextPage - 1 : 1;

            $scope.pageChanged = function () {
                projectService.getAllProjects($scope.currentPage).then(function (data) {
                    $scope.projects = data.documents;
                });
            };

            $scope.newProject = {
                project_id: '',
                description: ''
            };

            $scope.canCreateNewProjects = function () {
                return authorizedUser.role === 'admin';
            };

            $scope.saveNewProject = function () {
                projectService.saveNewProject($scope.newProject).then(function () {
                    $scope.pageChanged();
                    $scope.newProject.project_id = '';
                    $scope.newProject.description = '';
                });
            };
        });
})();