(function () {
    'use strict';

    /**
     * timax.js client config.
     */
    angular.module('timax.config', [])

        .constant('timaxConfig', {
            'backend': 'http://localhost:3000/',
            'identityProvider': 'http://localhost:3000/identityprovider'
        });
})();