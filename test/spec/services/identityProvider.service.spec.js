'use strict';

describe('Service: identityProviderService', function () {

    // load the service's module
    beforeEach(module('timaxjsClientApp'));

    // instantiate service
    var identityProviderService;
    beforeEach(inject(function (_identityProviderService_) {
        identityProviderService = _identityProviderService_;
    }));

    it('can be instantiated', function() {
        expect(identityProviderService).toBeDefined();
    });
});
