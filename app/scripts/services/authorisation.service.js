(function () {
    'use strict';

    /**
     * Authorisation service.
     */
    angular.module('timax.services.authorisation', ['LocalStorageModule', 'angular-jwt'])

        .factory('authorisationService', function ($q, localStorageService, jwtHelper) {
            var factoryObject = {};

            factoryObject.getPrincipal = function () {
                var tokenPayload,
                    authToken = localStorageService.get('token');

                try {
                    tokenPayload = jwtHelper.decodeToken(authToken);

                    if (jwtHelper.isTokenExpired(authToken)) {
                        return false;
                    } else {
                        return tokenPayload;
                    }
                } catch (err) {
                    return false;
                }
            };

            factoryObject.isAuthorized = function (requiredRole) {
                var principal, role;

                if (requiredRole === 'none') {
                    return true;
                }

                principal = factoryObject.getPrincipal();
                if (angular.isObject(principal) === false) {
                    return false;
                }

                role = principal.role;
                if (requiredRole === 'user') {
                    return (role === 'user' || role === 'manager' || role === 'admin');
                } else if (requiredRole === 'manager') {
                    return (role === 'manager' || role === 'admin');
                } else if (requiredRole === 'admin') {
                    return (role === 'admin');
                } else {
                    return false;
                }
            };

            factoryObject.isAuthorizedAsync = function (requiredRole) {
                var deferred = $q.defer();

                if (factoryObject.isAuthorized(requiredRole)) {
                    deferred.resolve(true);
                } else {
                    deferred.reject(false);
                }

                return deferred.promise;
            };

            return factoryObject;
        });
})();