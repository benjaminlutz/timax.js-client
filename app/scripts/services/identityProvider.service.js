'use strict';

/**
 * Identity provider service.
 */
angular.module('timax.services', ['LocalStorageModule'])
    .factory('identityProviderService', function ($q, $http, localStorageService) {
        var factoryObject = {};

        factoryObject.getToken = function (authData) {
            var deferred = $q.defer();

            $http.post('http://localhost:3000/identityprovider', authData).then(function (response) {
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