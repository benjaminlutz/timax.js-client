(function () {
    'use strict';

    /**
     * Socket service.
     */
    angular.module('timax.services.socket', ['btford.socket-io', 'LocalStorageModule', 'timax.services.authorisation', 'timax.config'])

        .factory('socketService', function ($q, $http, socketFactory, localStorageService, authorisationService, timaxConfig) {
            var token = localStorageService.get('token'),
                principal = authorisationService.getPrincipal();

            if (angular.isObject(principal) && (principal.role === 'admin' || principal.role === 'manager')) {
                var timaxSocket = socketFactory({
                    ioSocket: io.connect(timaxConfig.SOCKET, {
                        query: 'token=' + token
                    })
                });
                timaxSocket.forward('booking');
                return timaxSocket;
            } else {
                return false;
            }
        });
})();