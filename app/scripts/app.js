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
            'timax.controllers.logout',
            'timax.controllers.user',
            'timax.controllers.project',
            'timax.controllers.booking',
            'timax.directives.navigation',
            'timax.interceptors.authToken',
            'timax.interceptors.httpError',
            'timax.services.authorisation',
            'timax.services.user',
            'timax.services.project',
            'timax.services.booking'
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
            $httpProvider.interceptors.push('httpErrorInterceptor');
        })

        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    name: 'Start',
                    requiredRole: 'none',
                    templateUrl: 'views/start.html',
                    controller: 'StartController'
                })
                .when('/user', {
                    name: 'User',
                    requiredRole: 'admin',
                    templateUrl: 'views/user.html',
                    controller: 'UserController',
                    resolve: {
                        authorizedUser: function (authorisationService) {
                            return authorisationService.isAuthorizedAsync('admin');
                        },
                        user: function (userService) {
                            return userService.getAllUser();
                        }
                    }
                })
                .when('/projects', {
                    name: 'Projects',
                    requiredRole: 'manager',
                    templateUrl: 'views/project.html',
                    controller: 'ProjectController',
                    resolve: {
                        authorizedUser: function (authorisationService) {
                            return authorisationService.isAuthorizedAsync('manager');
                        },
                        projects: function (projectService) {
                            return projectService.getAllProjects();
                        }
                    }
                })
                .when('/bookings', {
                    name: 'Bookings',
                    requiredRole: 'user',
                    templateUrl: 'views/booking.html',
                    controller: 'BookingController',
                    resolve: {
                        authorizedUser: function (authorisationService) {
                            return authorisationService.isAuthorizedAsync('user');
                        },
                        bookings: function (bookingService) {
                            return bookingService.getBookings();
                        }
                    }
                })
                .when('/logout', {
                    controller: 'LogoutController',
                    template: ''
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();