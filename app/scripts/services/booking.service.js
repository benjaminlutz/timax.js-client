(function () {
    'use strict';

    /**
     * Booking service.
     */
    angular.module('timax.services.booking', ['timax.config'])

        .constant('BOOKING_RESOURCE_URL', 'booking')

        .factory('bookingService', function ($q, $http, timaxConfig, BOOKING_RESOURCE_URL) {
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

            factoryObject.getBookings = function (page) {
                var deferred = $q.defer(),
                    pageUrl = page ? '/?page=' + page : '';

                $http.get(timaxConfig.BACKEND + BOOKING_RESOURCE_URL + pageUrl).then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            return factoryObject;
        });
})();