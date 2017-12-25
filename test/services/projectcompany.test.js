const assert = require('assert');
const app = require('../../src/app');

describe('\'projectcompany\' service', () => {
  it('registered the service', () => {
    const service = app.service('projectcompany');

    assert.ok(service, 'Registered the service');
  });
});
