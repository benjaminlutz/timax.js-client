(function () {
    'use strict';

    /**
     * Booking controller.
     */
    angular.module('timax.controllers.booking', ['timax.services.user', 'timax.services.booking', 'timax.filters.asDate', 'timax.services.pagination'])

        .controller('BookingController', function ($scope, authorizedUser, bookings, userService, bookingService, paginationService) {
            $scope.bookings = [];
            $scope.totalItems = 0;
            $scope.currentPage = 1;
            $scope.projects = [];
            $scope.opened = false;

            function initPagination(documents, totalPages, nextPage) {
                $scope.bookings = documents;
                $scope.totalItems = paginationService.calculateTotalItems(totalPages);
                if (nextPage !== undefined) {
                    $scope.currentPage = paginationService.initCurrentPage(nextPage);
                }
            }

            function initNewBooking() {
                $scope.newBooking = bookingService.createNewBooking();
                $scope.newBookingDate = new Date();
                $scope.newBookingStart = new Date(2015, 0, 1, 8, 30);
                $scope.newBookingEnd = new Date(2015, 0, 1, 18, 30);
            }

            $scope.pageChanged = function () {
                bookingService.getBookings($scope.currentPage).then(function (data) {
                    initPagination(data.documents, data.totalPages);
                });
            };

            $scope.openDatePicker = function ($event) {
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

            $scope.canSeeUserRow = function () {
                return authorizedUser.role !== 'user';
            };

            $scope.canEditBooking = function () {
                return authorizedUser.role === 'admin' || authorizedUser.role === 'user';
            };

            $scope.canCreateBooking = function () {
                return authorizedUser.role === 'user';
            };

            // init
            initNewBooking();
            initPagination(bookings.documents, bookings.totalPages, bookings.nextPage);
            userService.getProjectsByUser(authorizedUser._id).then(function (projects) {
                $scope.projects = projects;
            });
        });
})();