const assert = require('assert');
const app = require('../../src/app');

describe('\'totals\' service', () => {
  it('registered the service', () => {
    const service = app.service('totals');

    assert.ok(service, 'Registered the service');
  });
});
