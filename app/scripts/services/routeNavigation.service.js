(function () {
    'use strict';

    /**
     * Route navigation service.
     */
    angular.module('timax.services.routeNavigation', ['timax.services.authorisation'])

        .factory('routeNavigationService', function ($route, $location, authorisationService) {
            var factoryObject = {};

            factoryObject.generateRouteNavigationItems = function () {
                var routes = [], principal;

                angular.forEach($route.routes, function (route, path) {
                    if (route.name) {
                        principal = authorisationService.isAuthorized(route.requiredRole);
                        if (principal) {
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
                    },
                    principal: principal
                };
            };

            return factoryObject;
        });
})();