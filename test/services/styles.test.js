const assert = require('assert');
const app = require('../../src/app');

describe('\'styles\' service', () => {
  it('registered the service', () => {
    const service = app.service('styles');

    assert.ok(service, 'Registered the service');
  });
});
