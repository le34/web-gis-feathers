const assert = require('assert');
const app = require('../../src/app');

describe('\'fonts\' service', () => {
  it('registered the service', () => {
    const service = app.service('fonts');

    assert.ok(service, 'Registered the service');
  });
});
