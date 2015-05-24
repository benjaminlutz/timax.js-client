(function () {
    'use strict';

    /**
     * Booking controller.
     */
    angular.module('timax.controllers.booking', ['timax.services.user', 'timax.services.booking', 'timax.filters.asDate', 'timax.services.pagination'])

        .controller('BookingController', function ($scope, authorizedUser, bookings, userService, bookingService, paginationService) {
            $scope.bookings = bookings.documents;
            $scope.totalItems = paginationService.calculateTotalItems(bookings.totalPages);
            $scope.currentPage = paginationService.initCurrentPage(bookings.nextPage);

            $scope.pageChanged = function () {
                bookingService.getBookings($scope.currentPage).then(function (data) {
                    $scope.bookings = data.documents;
                });
            };

            function initNewBooking() {
                $scope.newBooking = bookingService.createNewBooking();
                $scope.newBookingDate = new Date();
                $scope.newBookingStart = new Date(2015, 0, 1, 8, 30);
                $scope.newBookingEnd = new Date(2015, 0, 1, 18, 30);
            }

            $scope.opened = false;
            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.saveNewBooking = function () {
                bookingService.saveNewBooking($scope.newBooking, $scope.newBookingDate, $scope.newBookingStart, $scope.newBookingEnd).then(function () {
                    $scope.pageChanged();
                    initNewBooking();
                });
            };

            $scope.projects = [];

            // init
            initNewBooking();
            userService.getProjectsByUser(authorizedUser._id).then(function (projects) {
                $scope.projects = projects;
            });
        });
})();