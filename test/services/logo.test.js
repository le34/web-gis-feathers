const assert = require('assert');
const app = require('../../src/app');

describe('\'logo\' service', () => {
  it('registered the service', () => {
    const service = app.service('logo');

    assert.ok(service, 'Registered the service');
  });
});
