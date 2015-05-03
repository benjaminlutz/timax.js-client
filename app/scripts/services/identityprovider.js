'use strict';

/**
 * Identityprovider service.
 */
angular.module('timaxjsClientApp')
    .factory('identityproviderService', function ($q, $http, localStorageService) {
        var factoryObject = {};

        factoryObject.getToken = function () {
            var deferred = $q.defer(),
                authData = {
                    email: 'admin@test.com',
                    password: 'geheim'
                };

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