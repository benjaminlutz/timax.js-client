(function () {
    'use strict';

    /**
     * Booking controller.
     */
    angular.module('timax.controllers.booking', ['timax.services.user'])

        .controller('BookingController', function ($scope, authorizedUser, userService) {
            $scope.projects = [];

            userService.getProjectsByUser(authorizedUser._id).then(function (projects) {
                $scope.projects = projects;
            });
        });
})();