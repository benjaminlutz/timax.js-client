(function () {
    'use strict';

    /**
     * timax.js client config.
     */
    angular.module('timax.config', [])

        .constant('timaxConfig', {
            'BACKEND': 'http://localhost:3000/',
            'IDENTITY_PROVIDER': 'http://localhost:3000/identityprovider'
        });
})();