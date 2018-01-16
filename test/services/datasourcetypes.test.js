const assert = require('assert');
const app = require('../../src/app');

describe('\'datasourcetypes\' service', () => {
  it('registered the service', () => {
    const service = app.service('datasourcetypes');

    assert.ok(service, 'Registered the service');
  });
});
