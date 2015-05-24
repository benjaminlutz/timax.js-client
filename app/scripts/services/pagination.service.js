(function () {
    'use strict';

    /**
     * Pagination service.
     */
    angular.module('timax.services.pagination', ['timax.config'])

        .factory('paginationService', function (timaxConfig) {
            var factoryObject = {};

            factoryObject.calculateTotalItems = function (totalPages) {
                return totalPages * timaxConfig.ITEMS_PER_PAGE;
            };

            factoryObject.initCurrentPage = function (nextPage) {
                return nextPage > 1 ? nextPage - 1 : 1;
            };

            return factoryObject;
        });
})();