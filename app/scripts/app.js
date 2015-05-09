'use strict';

/**
 * Main module of the application.
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
        'timax.controllers',
        'timax.directives',
        'timax.interceptors'
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
                templateUrl: 'views/start.html',
                controller: 'StartController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
