(function () {
    'use strict';

    /**
     * Navigation directive.
     */
    angular.module('timax.directives.navigation', ['timax.services.routeNavigation'])

        .directive('navigation', function (routeNavigationService) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'views/directives/navigation.directive.html',
                controller: function ($scope) {
                    $scope.routes = routeNavigationService.routes;
                    $scope.activeRoute = routeNavigationService.activeRoute;
                    $scope.principal = routeNavigationService.principal;
                }
            };
        });
})();