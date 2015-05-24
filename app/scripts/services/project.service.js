(function () {
    'use strict';

    /**
     * Project service.
     */
    angular.module('timax.services.project', ['timax.services.queryString', 'timax.config'])

        .constant('PROJECT_RESOURCE_URL', 'project')

        .factory('projectService', function ($q, $http, queryStringService, timaxConfig, PROJECT_RESOURCE_URL) {
            var factoryObject = {};

            factoryObject.createNewProject = function () {
                return {
                    project_id: '',
                    description: ''
                };
            };

            factoryObject.getAllProjects = function (page) {
                var deferred = $q.defer(),
                    queryObject = {};

                if (page !== undefined && page !== '') {
                    queryObject.page = page;
                }

                $http.get(timaxConfig.BACKEND + PROJECT_RESOURCE_URL + '/' + queryStringService.convertObjectToQueryString(queryObject)).then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            factoryObject.getProject = function (projectId) {
                var deferred = $q.defer();

                $http.get(timaxConfig.BACKEND + PROJECT_RESOURCE_URL + '/' + projectId).then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            factoryObject.saveNewProject = function (newProject) {
                var deferred = $q.defer();

                $http.post(timaxConfig.BACKEND + PROJECT_RESOURCE_URL, newProject).then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            factoryObject.addUserToProject = function (userId, projectId) {
                return $http.post(timaxConfig.BACKEND + PROJECT_RESOURCE_URL + '/' + projectId + '/user', {
                    userId: userId
                });
            };

            factoryObject.deleteUserFromProject = function (userId, projectId) {
                return $http.delete(timaxConfig.BACKEND + PROJECT_RESOURCE_URL + '/' + projectId + '/user/' + userId);
            };

            return factoryObject;
        });
})();