(function () {
    'use strict';

    /**
     * Edit booking controller.
     */
    angular.module('timax.controllers.modals.editBooking', ['timax.services.booking', 'timax.services.user'])

        .controller('EditBookingController', function ($scope, $element, bookingService, userService, booking, close) {
            $scope.booking = booking;
            $scope.opened = false;
            $scope.projects = [];

            $scope.bookingDate = new Date(booking.start);
            $scope.bookingStart = new Date(booking.start);
            $scope.bookingEnd = new Date(booking.end);

            $scope.openDatePicker = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened = true;
            };

            $scope.save = function () {
                bookingService.updateBooking($scope.booking, $scope.bookingDate, $scope.bookingStart, $scope.bookingEnd).then(function () {
                    $element.modal('hide');
                    close(true, 500);
                });
            };

            $scope.close = function (result) {
                $element.modal('hide');
                close(result, 500);
            };

            // init
            userService.getProjectsByUser(booking.user._id).then(function (projects) {
                $scope.projects = projects;
            });
        });
})();