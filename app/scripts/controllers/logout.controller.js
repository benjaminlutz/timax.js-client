(function () {
    'use strict';

    /**
     * Logout controller.
     */
    angular.module('timax.controllers.logout', ['timax.services.authorisation'])

        .controller('LogoutController', function ($timeout, $location, $window, authorisationService) {
            console.log('logout controller...');
            authorisationService.logout();
            $window.location.href = '#/';
            $window.location.reload();
        });
})();