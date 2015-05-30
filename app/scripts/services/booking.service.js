(function () {
    'use strict';

    /**
     * Booking service.
     */
    angular.module('timax.services.booking', ['timax.services.queryString', 'timax.config'])

        .constant('BOOKING_RESOURCE_URL', 'booking')

        .factory('bookingService', function ($q, $http, queryStringService, timaxConfig, BOOKING_RESOURCE_URL) {
            var factoryObject = {};

            factoryObject.createNewBooking = function () {
                return {
                    start: new Date(),
                    end: new Date(),
                    description: '',
                    project: ''
                };
            };

            factoryObject.saveNewBooking = function (newBooking, date, start, end) {
                var deferred = $q.defer();

                newBooking.start = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                    start.getHours(), start.getMinutes());

                newBooking.end = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                    end.getHours(), end.getMinutes());

                $http.post(timaxConfig.BACKEND + BOOKING_RESOURCE_URL, newBooking).then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            factoryObject.getBookings = function (page, projectId) {
                var deferred = $q.defer(),
                    queryObject = {};

                if (page !== undefined && page !== '') {
                    queryObject.page = page;
                }

                if (projectId !== undefined && projectId !== '') {
                    queryObject.project = projectId;
                }

                $http.get(timaxConfig.BACKEND + BOOKING_RESOURCE_URL + '/' + queryStringService.convertObjectToQueryString(queryObject)).then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            factoryObject.getBooking = function (bookingId) {
                var deferred = $q.defer();

                $http.get(timaxConfig.BACKEND + BOOKING_RESOURCE_URL + '/' + bookingId).then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            factoryObject.deleteBooking = function (bookingId) {
                return $http.delete(timaxConfig.BACKEND + BOOKING_RESOURCE_URL + '/' + bookingId);
            };

            return factoryObject;
        });
})();