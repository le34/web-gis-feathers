const assert = require('assert');
const app = require('../../src/app');

describe('\'projectsTiles\' service', () => {
  it('registered the service', () => {
    const service = app.service('projects-tiles');

    assert.ok(service, 'Registered the service');
  });
});
