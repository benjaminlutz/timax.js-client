'use strict';

describe('Service: identityprovider', function () {

  // load the service's module
  beforeEach(module('timaxjsClientApp'));

  // instantiate service
  var identityprovider;
  beforeEach(inject(function (_identityprovider_) {
    identityprovider = _identityprovider_;
  }));

  it('should do something', function () {
    expect(!!identityprovider).toBe(true);
  });

});