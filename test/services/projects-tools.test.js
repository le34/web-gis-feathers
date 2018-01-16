const assert = require('assert');
const app = require('../../src/app');

describe('\'projects-tools\' service', () => {
  it('registered the service', () => {
    const service = app.service('projects-tools');

    assert.ok(service, 'Registered the service');
  });
});
