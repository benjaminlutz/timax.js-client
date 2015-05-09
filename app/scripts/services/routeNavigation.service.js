'use strict';

/**
 * Route navigation service.
 */
angular.module('timax.services')
    .factory('routeNavigationService', function ($route, $location) {
        var routes = [];
        angular.forEach($route.routes, function (route, path) {
            if (route.name) {
                routes.push({
                    path: path,
                    name: route.name
                });
            }
        });
        return {
            routes: routes,
            activeRoute: function (route) {
                return route.path === $location.path();
            }
        };
    });