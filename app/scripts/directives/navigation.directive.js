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
                controller: function ($scope, $rootScope) {

                    function setRouteNavigationData() {
                        var routeNavigationObject = routeNavigationService.generateRouteNavigationItems();
                        $scope.routes = routeNavigationObject.routes;
                        $scope.activeRoute = routeNavigationObject.activeRoute;
                        $scope.principal = routeNavigationObject.principal;
                    }

                    $rootScope.$on('reloadNavigation', function () {
                        setRouteNavigationData();
                    });

                    // init
                    setRouteNavigationData();
                }
            };
        });
})();