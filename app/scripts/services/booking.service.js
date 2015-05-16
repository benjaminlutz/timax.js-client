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
                    start: Date.now(),
                    end: Date.now(),
                    description: '',
                    project: ''
                };
            };

            return factoryObject;
        });
})();