(function () {
    'use strict';

    /**
     * Socket service.
     */
    angular.module('timax.services.socket', ['btford.socket-io', 'timax.config'])

        .factory('socketService', function ($q, $http, socketFactory, localStorageService, timaxConfig) {
            var token = localStorageService.get('token');

            // TODO check authentication, role, etc...

            var timaxSocket = socketFactory({
                ioSocket: io.connect(timaxConfig.SOCKET, {
                    query: 'token=' + token
                })
            });
            timaxSocket.forward('booking');
            return timaxSocket;
        });
})();