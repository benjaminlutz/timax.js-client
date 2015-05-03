'use strict';

/**
 * Navigation controller.
 */
angular.module('timaxjsClientApp')
    .controller('NavigationCtrl', function ($scope, $location) {

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    });
