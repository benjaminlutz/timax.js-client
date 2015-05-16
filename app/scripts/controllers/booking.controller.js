(function () {
    'use strict';

    /**
     * Booking controller.
     */
    angular.module('timax.controllers.booking', ['timax.services.user', 'timax.services.booking'])

        .controller('BookingController', function ($scope, authorizedUser, userService, bookingService) {
            $scope.projects = [];

            $scope.newBooking = bookingService.createNewBooking();

            $scope.opened = false;

            $scope.newBookingDate = new Date();
            $scope.newBookingStart = new Date(2015,0,1,8,30);
            $scope.newBookingEnd = new Date(2015,0,1,18,30);

            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.saveNewBooking = function () {
                $scope.newBooking.start = new Date($scope.newBookingDate.getFullYear(), $scope.newBookingDate.getMonth(), $scope.newBookingDate.getDate(),
                    $scope.newBookingStart.getHours(), $scope.newBookingStart.getMinutes());

                $scope.newBooking.end = new Date($scope.newBookingDate.getFullYear(), $scope.newBookingDate.getMonth(), $scope.newBookingDate.getDate(),
                    $scope.newBookingEnd.getHours(), $scope.newBookingEnd.getMinutes());

                // TODO convert timezone

                bookingService.saveNewBooking($scope.newBooking).then(function () {
                    // TODO reload the actual page
                    $scope.newBooking = bookingService.createNewBooking();
                });
            };

            // init
            userService.getProjectsByUser(authorizedUser._id).then(function (projects) {
                $scope.projects = projects;
            });
        });
})();