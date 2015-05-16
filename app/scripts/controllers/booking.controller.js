(function () {
    'use strict';

    /**
     * Booking controller.
     */
    angular.module('timax.controllers.booking', ['timax.services.user', 'timax.services.booking'])

        .controller('BookingController', function ($scope, authorizedUser, userService, bookingService) {
            $scope.projects = [];
            $scope.newBooking = bookingService.createNewBooking();

            $scope.saveNewBooking = function () {
                console.log($scope.newBooking);
                $scope.newBooking = bookingService.createNewBooking();
            };

            // init
            userService.getProjectsByUser(authorizedUser._id).then(function (projects) {
                $scope.projects = projects;
            });
        });
})();