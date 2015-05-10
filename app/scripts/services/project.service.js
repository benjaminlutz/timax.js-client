(function () {
    'use strict';

    /**
     * Project service.
     */
    angular.module('timax.services.project', ['timax.config'])

        .constant('PROJECT_RESOURCE_URL', 'project')

        .factory('projectService', function ($q, $http, timaxConfig, PROJECT_RESOURCE_URL) {
            var factoryObject = {};

            factoryObject.getAllProjects = function () {
                var deferred = $q.defer();

                $http.get(timaxConfig.BACKEND + PROJECT_RESOURCE_URL).then(function (response) {
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

            return factoryObject;
        });
})();