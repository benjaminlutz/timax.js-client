(function () {
    'use strict';

    /**
     * Booking controller.
     */
    angular.module('timax.controllers.booking', ['angularModalService', 'timax.controllers.modals.confirmation', 'timax.controllers.modals.editBooking', 'timax.services.user', 'timax.services.booking', 'timax.services.socket', 'timax.filters.asDate', 'timax.services.pagination'])

        .controller('BookingController', function ($scope, $filter, authorizedUser, bookings, ModalService, userService, bookingService, paginationService, growl, socketService) {
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

            $scope.editBooking = function (booking) {
                ModalService.showModal({
                    templateUrl: 'views/modals/editBooking.html',
                    controller: 'EditBookingController',
                    inputs: {
                        booking: booking
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        if (result) {
                            $scope.pageChanged();
                        }
                    });
                });
            };

            $scope.deleteBooking = function (booking) {
                ModalService.showModal({
                    templateUrl: 'views/modals/confirmation.html',
                    controller: 'ConfirmationController',
                    inputs: {
                        message: 'Do you really want to delete the booking?'
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function (result) {
                        if (result) {
                            bookingService.deleteBooking(booking._id).then(function () {
                                $scope.pageChanged();
                            });
                        }
                    });
                });
            };

            function formatDate(date) {
                var dateObj = $filter('asDate')(date);
                return $filter('date')(dateObj, 'dd.MM.yyyy HH:mm');
            }

            $scope.$on('socket:booking', function (ev, data) {
                var message = 'from <b>' + data.user + '</b> on project <b>' + data.project + '</b><br/>';
                message = message + 'Description: <b>' + data.description + '</b><br/>';
                message = message + 'Start: <b>' + formatDate(data.start) + '</b><br/>';
                message = message + 'End: <b>' + formatDate(data.end) + '</b>';

                growl.info(message, {title: 'New Booking'});
            });

            // init
            initNewBooking();
            initPagination(bookings.documents, bookings.totalPages, bookings.nextPage);
            userService.getProjectsByUser(authorizedUser._id).then(function (projects) {
                $scope.projects = projects;
            });
        });
})();