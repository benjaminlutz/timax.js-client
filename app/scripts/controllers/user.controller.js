(function () {
    'use strict';

    /**
     * User controller.
     */
    angular.module('timax.controllers.user', ['ui.bootstrap', 'timax.services.user', 'timax.services.pagination'])

        .controller('UserController', function ($scope, authorizedUser, user, userService, paginationService) {
            $scope.users = [];
            $scope.totalItems = 0;
            $scope.currentPage = 1;

            function initPagination(documents, totalPages, nextPage) {
                $scope.users = documents;
                $scope.totalItems = paginationService.calculateTotalItems(totalPages);
                if (nextPage !== undefined) {
                    $scope.currentPage = paginationService.initCurrentPage(nextPage);
                }
            }

            $scope.pageChanged = function () {
                userService.getAllProjects($scope.currentPage).then(function (data) {
                    initPagination(data.documents, data.totalPages);
                });
            };

            //init
            initPagination(user.documents, user.totalPages, user.nextPage);
        });
})();