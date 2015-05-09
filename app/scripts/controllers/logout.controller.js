(function () {
    'use strict';

    /**
     * Logout controller.
     */
    angular.module('timax.controllers.logout', ['timax.services.authorisation'])

        .controller('LogoutController', function ($timeout, $location, $route, $rootScope, authorisationService) {
            authorisationService.logout();

            if ($location.path() === '/') {
                $route.reload();
            } else {
                $location.path('/');
            }

            $rootScope.$emit('reloadNavigation', false);
        });
})();