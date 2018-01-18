const assert = require('assert');
const app = require('../../src/app');

describe('\'codetables\' service', () => {
  it('registered the service', () => {
    const service = app.service('codetables');

    assert.ok(service, 'Registered the service');
  });
});
