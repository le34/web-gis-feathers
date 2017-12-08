const assert = require('assert');
const app = require('../../src/app');

describe('\'geometries\' service', () => {
  it('registered the service', () => {
    const service = app.service('geometries');

    assert.ok(service, 'Registered the service');
  });
});
