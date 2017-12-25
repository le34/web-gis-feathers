const assert = require('assert');
const app = require('../../src/app');

describe('\'projectstyles\' service', () => {
  it('registered the service', () => {
    const service = app.service('projectstyles');

    assert.ok(service, 'Registered the service');
  });
});
