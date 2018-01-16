const assert = require('assert');
const app = require('../../src/app');

describe('\'tiles\' service', () => {
  it('registered the service', () => {
    const service = app.service('tiles');

    assert.ok(service, 'Registered the service');
  });
});
