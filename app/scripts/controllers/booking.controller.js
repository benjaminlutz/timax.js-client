(function () {
    'use strict';

    /**
     * Booking controller.
     */
    angular.module('timax.controllers.booking', ['timax.services.user', 'timax.services.booking', 'timax.filters.asDate'])

        .controller('BookingController', function ($scope, authorizedUser, bookings, userService, bookingService) {
            $scope.bookings = bookings.documents;
            $scope.totalItems = bookings.totalPages * 10;
            $scope.currentPage = bookings.nextPage > 1 ? bookings.nextPage - 1 : 1;

            $scope.pageChanged = function () {
                bookingService.getBookings($scope.currentPage).then(function (data) {
                    $scope.bookings = data.documents;
                });
            };

            $scope.projects = [];

            $scope.newBooking = bookingService.createNewBooking();
            $scope.newBookingDate = new Date();
            $scope.newBookingStart = new Date(2015,0,1,8,30);
            $scope.newBookingEnd = new Date(2015,0,1,18,30);

            $scope.opened = false;
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
                    $scope.pageChanged();
                    $scope.newBooking = bookingService.createNewBooking();
                });
            };

            // init
            userService.getProjectsByUser(authorizedUser._id).then(function (projects) {
                $scope.projects = projects;
            });
        });
})();