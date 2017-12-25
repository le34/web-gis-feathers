const assert = require('assert');
const app = require('../../src/app');

describe('\'extent\' service', () => {
  it('registered the service', () => {
    const service = app.service('extent');

    assert.ok(service, 'Registered the service');
  });
});
