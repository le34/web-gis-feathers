const assert = require('assert');
const app = require('../../src/app');

describe('\'cvr\' service', () => {
  it('registered the service', () => {
    const service = app.service('cvr');

    assert.ok(service, 'Registered the service');
  });
});
