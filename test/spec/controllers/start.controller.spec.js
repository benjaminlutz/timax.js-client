'use strict';

describe('Controller: StartController', function () {

    // load the controller's module
    beforeEach(module('timaxjsClientApp'));

    var StartCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        StartCtrl = $controller('StartController', {
            $scope: scope
        });
    }));

    it('can be instantiated', function() {
        expect(StartCtrl).toBeDefined();
    });

});
