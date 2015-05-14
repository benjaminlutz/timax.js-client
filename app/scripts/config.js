(function () {
    'use strict';

    /**
     * timax.js client config.
     */
    angular.module('timax.config', [])

        .constant('timaxConfig', {
            'BACKEND': 'http://localhost:3000/',
            'IDENTITY_PROVIDER': 'http://localhost:3000/identityprovider',

            'PROJECT_ID_PATTERN': /^P00[0-9]{3}/
        });
})();