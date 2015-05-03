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
        'angularModalService'
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
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
