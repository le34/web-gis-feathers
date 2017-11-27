const assert = require('assert');
const app = require('../../src/app');

describe('\'datany\' service', () => {
  it('registered the service', () => {
    const service = app.service('datany');

    assert.ok(service, 'Registered the service');
  });
});
