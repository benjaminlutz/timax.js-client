'use strict';

/**
 * Navigation directive.
 */
angular.module('timaxjsClientApp')
    .directive('navigation', function (routeNavigationService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/directives/navigation.directive.html',
            controller: function ($scope) {
                $scope.routes = routeNavigationService.routes;
                $scope.activeRoute = routeNavigationService.activeRoute;
            }
        };
    });