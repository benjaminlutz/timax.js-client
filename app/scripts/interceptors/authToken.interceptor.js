(function () {
    'use strict';

    /**
     * Authentication token interceptor.
     */
    angular.module('timax.interceptors.authToken', ['LocalStorageModule'])

        .factory('authTokenInterceptor', function ($q, localStorageService) {
            return {
                'request': function (config) {
                    var authToken = localStorageService.get('token');

                    if (authToken) {
                        config.headers['Authorization'] = 'Bearer ' + authToken;
                    }
                    return config || $q.when(config);
                }
            };
        });
})();