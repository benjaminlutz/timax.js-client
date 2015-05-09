(function () {
    'use strict';

    /**
     * Booking controller.
     */
    angular.module('timax.controllers.booking', [])

        .controller('BookingController', function ($scope, authorizedUser) {
            $scope.firstName = authorizedUser.firstName;
            $scope.lastName = authorizedUser.lastName;
        });
})();