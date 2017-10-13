// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('feathers-errors');
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function usersRestrict(hook) {
    if (!hook.params.user) {
      throw new errors.NotAuthenticated();
    }
    if (hook.params.user.id === hook.id) {
      throw new errors.NotAcceptable('Du må ikke slette dig selv');
    }
    if (hook.params.user.role === 'system') {
      return Promise.resolve(hook);
    }
    return hook.app.service('/users').find({ query: { id: hook.id } }).then(result => {
      if (result.data.length === 1) {
        const user = result.data[0];
        if (hook.params.user.role === 'admin' && hook.params.user.clientId === user.clientId) {
          return Promise.resolve(hook);
        }
        throw new errors.Forbidden('Du har ikke rettigheder til denne handling');
      }
      throw new errors.NotFound();
    });
  };
};
