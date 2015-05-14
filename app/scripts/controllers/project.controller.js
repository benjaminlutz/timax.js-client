(function () {
    'use strict';

    /**
     * Project controller.
     */
    angular.module('timax.controllers.project', ['ui.bootstrap', 'angularModalService', 'timax.services.project', 'timax.controllers.modals.manageUser', 'timax.config'])

        .controller('ProjectController', function ($scope, authorizedUser, projects, ModalService, projectService, timaxConfig) {
            $scope.projectIdPattern = timaxConfig.PROJECT_ID_PATTERN;

            $scope.projects = projects.documents;
            $scope.totalItems = projects.totalPages * 10;
            $scope.currentPage = projects.nextPage > 1 ? projects.nextPage - 1 : 1;

            $scope.newProject = projectService.createNewProject();

            $scope.pageChanged = function () {
                projectService.getAllProjects($scope.currentPage).then(function (data) {
                    $scope.projects = data.documents;
                });
            };

            $scope.canCreateNewProjects = function () {
                return authorizedUser.role === 'admin';
            };

            $scope.saveNewProject = function () {
                projectService.saveNewProject($scope.newProject).then(function () {
                    $scope.pageChanged();
                    $scope.newProject = projectService.createNewProject();
                });
            };

            $scope.showManageUserDialog = function (projectId) {
                projectService.getProject(projectId).then(function (project) {
                    ModalService.showModal({
                        templateUrl: 'views/modals/manageUser.html',
                        controller: 'ManageUserController',
                        inputs: {
                            project: project
                        }
                    }).then(function (modal) {
                        modal.element.modal();
                        modal.close.then(function () {
                            $scope.pageChanged();
                        });
                    });
                });
            };
        });
})();