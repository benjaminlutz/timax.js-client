(function () {
    'use strict';

    /**
     * HTTP error interceptor.
     */
    angular.module('timax.interceptors.httpError', ['angularModalService', 'timax.controllers.modals.error'])

        .factory('httpErrorInterceptor', function ($q, $injector) {
            return {
                'responseError': function (rejection) {
                    if (rejection.config.skipGenericErrorHandling) {
                        return $q.reject(rejection);
                    }

                    var ModalService = $injector.get('ModalService');
                    ModalService.showModal({
                        templateUrl: 'views/modals/error.html',
                        controller: 'ErrorController',
                        inputs: {
                            error: rejection.data.error
                        }
                    }).then(function (modal) {
                        modal.element.modal();
                        modal.close.then(function () {

                        });
                    });

                    return $q.reject(rejection);
                }
            };
        });
})();