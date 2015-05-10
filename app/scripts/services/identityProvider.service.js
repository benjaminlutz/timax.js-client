(function () {
    'use strict';

    /**
     * Identity provider service.
     */
    angular.module('timax.services.identityProvider', ['LocalStorageModule', 'timax.config'])

        .factory('identityProviderService', function ($q, $http, localStorageService, timaxConfig) {
            var factoryObject = {};

            factoryObject.getToken = function (authData) {
                var deferred = $q.defer();

                $http.post(timaxConfig.IDENTITY_PROVIDER, authData, {skipGenericErrorHandling: true}).then(function (response) {
                    var token = response.data;
                    localStorageService.set('token', token);
                    deferred.resolve({token: token});
                }, function (reason) {
                    deferred.reject(reason);
                });

                return deferred.promise;
            };

            return factoryObject;
        });
})();