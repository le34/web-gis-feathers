const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const stylesBeforeRemove = require('../../src/hooks/styles-before-remove');

describe('\'styles-before-remove\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: stylesBeforeRemove()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
