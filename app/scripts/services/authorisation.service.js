(function () {
    'use strict';

    /**
     * Authorisation service.
     */
    angular.module('timax.services.authorisation', ['LocalStorageModule', 'angular-jwt'])

        .factory('authorisationService', function ($q, localStorageService, jwtHelper) {
            var factoryObject = {};

            factoryObject.logout = function () {
                localStorageService.remove('token');
            };

            factoryObject.getPrincipal = function () {
                var tokenPayload,
                    authToken = localStorageService.get('token');

                try {
                    tokenPayload = jwtHelper.decodeToken(authToken);

                    if (jwtHelper.isTokenExpired(authToken)) {
                        factoryObject.logout();
                        return false;
                    } else {
                        return tokenPayload;
                    }
                } catch (err) {
                    factoryObject.logout();
                    return false;
                }
            };

            factoryObject.isAuthorized = function (requiredRole) {
                var role,
                    principal = factoryObject.getPrincipal();

                if (requiredRole === 'none') {
                    return principal || true;
                }

                if (angular.isObject(principal) === false) {
                    return false;
                }

                role = principal.role;
                if (requiredRole === 'user') {
                    return (role === 'user' || role === 'manager' || role === 'admin') ? principal : false;
                } else if (requiredRole === 'manager') {
                    return (role === 'manager' || role === 'admin') ? principal : false;
                } else if (requiredRole === 'admin') {
                    return (role === 'admin') ? principal : false;
                } else {
                    return false;
                }
            };

            factoryObject.isAuthorizedAsync = function (requiredRole) {
                var deferred = $q.defer(),
                    principal = factoryObject.isAuthorized(requiredRole);

                if (principal) {
                    deferred.resolve(principal);
                } else {
                    deferred.reject(false);
                }

                return deferred.promise;
            };

            return factoryObject;
        });
})();