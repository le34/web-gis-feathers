const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const datasourcesBeforeRemove = require('../../src/hooks/datasources-before-remove');

describe('\'datasources-before-remove\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: datasourcesBeforeRemove()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
