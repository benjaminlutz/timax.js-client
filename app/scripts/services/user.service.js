(function () {
    'use strict';

    /**
     * User service.
     */
    angular.module('timax.services.user', ['timax.services.queryString', 'timax.config'])

        .constant('USER_RESOURCE_URL', 'user')

        .factory('userService', function ($q, $http, queryStringService, timaxConfig, USER_RESOURCE_URL) {
            var factoryObject = {};

            factoryObject.getAllUser = function (page) {
                var deferred = $q.defer(),
                    queryObject = {};

                if (page !== undefined && page !== '') {
                    queryObject.page = page;
                }

                $http.get(timaxConfig.BACKEND + USER_RESOURCE_URL + '/' + queryStringService.convertObjectToQueryString(queryObject)).then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            factoryObject.searchUser = function (searchString) {
                var deferred = $q.defer(),
                    searchUserUrl = '/search?q=' + searchString;

                $http.get(timaxConfig.BACKEND + USER_RESOURCE_URL + searchUserUrl).then(function (response) {
                    for (var i = 0; i < response.data.length; i++) {
                        var user = response.data[i];
                        user.formattedName = user.firstName + ' ' + user.lastName + ' (' + user.email + ')';
                    }
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            factoryObject.getProjectsByUser = function (userId) {
                var deferred = $q.defer();

                $http.get(timaxConfig.BACKEND + USER_RESOURCE_URL + '/' + userId + '/project').then(function (response) {
                    for (var i = 0; i < response.data.length; i++) {
                        var project = response.data[i];
                        project.formattedName = project.project_id + ' (' + project.description + ')';
                    }
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            return factoryObject;
        });
})();