(function () {
    'use strict';

    /**
     * timax.js client config.
     */
    angular.module('timax.config', [])

        .constant('timaxConfig', {
            'BACKEND': 'http://localhost:3000/',
            'IDENTITY_PROVIDER': 'http://localhost:3000/identityprovider',
            'SOCKET': 'http://localhost:7777/',

            'PROJECT_ID_PATTERN': /^P00[0-9]{3}/,
            'ITEMS_PER_PAGE': 10
        });
})();