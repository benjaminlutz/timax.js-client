(function () {
    'use strict';

    /**
     * Main module of timax.js.
     */
    angular
        .module('timaxjsClientApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'LocalStorageModule',
            'timax.config',
            'timax.controllers.start',
            'timax.controllers.project',
            'timax.directives.navigation',
            'timax.interceptors.authToken',
            'timax.services.authorisation'
        ])

        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setPrefix('timax')
                .setStorageType('localStorage')
                .setNotify(true, true);
        })

        .config(function ($httpProvider) {
            // needed for CORS
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $httpProvider.interceptors.push('authTokenInterceptor');
        })

        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    name: 'Start',
                    requiredRole: 'none',
                    templateUrl: 'views/start.html',
                    controller: 'StartController'
                })
                .when('/projects', {
                    name: 'Projects',
                    requiredRole: 'manager',
                    templateUrl: 'views/project.html',
                    controller: 'ProjectController',
                    resolve: {
                        authorized: function (authorisationService) {
                            return authorisationService.isAuthorizedAsync('manager');
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();