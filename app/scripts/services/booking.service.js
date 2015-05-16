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

            factoryObject.saveNewBooking = function (newBooking) {
                var deferred = $q.defer();

                $http.post(timaxConfig.BACKEND + BOOKING_RESOURCE_URL, newBooking).then(function (response) {
                    deferred.resolve(response.data);
                }, function (err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            return factoryObject;
        });
})();