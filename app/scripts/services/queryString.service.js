(function () {
    'use strict';

    /**
     * Query string service.
     */
    angular.module('timax.services.queryString', [])

        .factory('queryStringService', function () {
            var factoryObject = {};

            factoryObject.convertObjectToQueryString = function (obj, prefix) {
                var str = [];
                for (var p in obj) {
                    var k = prefix ? prefix + '[' + p + ']' : p,
                        v = obj[k];
                    str.push(angular.isObject(v) ? factoryObject.convertObjectToQueryString(v, k) : (k) + '=' + encodeURIComponent(v));
                }
                return '?' + str.join('&');
            };

            return factoryObject;
        });
})();