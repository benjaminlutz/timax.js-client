(function () {
    'use strict';

    /**
     * Route navigation service.
     */
    angular.module('timax.services.routeNavigation', ['timax.services.authorisation'])

        .factory('routeNavigationService', function ($route, $location, authorisationService) {
            var routes = [];

            angular.forEach($route.routes, function (route, path) {
                if (route.name) {
                    if (authorisationService.isAuthorized(route.requiredRole)) {
                        routes.push({
                            path: path,
                            name: route.name
                        });
                    }
                }
            });

            return {
                routes: routes,
                activeRoute: function (route) {
                    return route.path === $location.path();
                }
            };
        });
})();