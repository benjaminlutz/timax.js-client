(function () {
    'use strict';

    /**
     * As date filter.
     */
    angular.module('timax.filters.asDate', [])

        .filter('asDate', function () {
            return function (input) {
                return new Date(input);
            };
        });
})();