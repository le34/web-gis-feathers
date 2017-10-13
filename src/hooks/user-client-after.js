// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function userClientAfter(hook) {
    return hook.app.service('/users').find({ query: { id: hook.result.id }}).then(result => {
      hook.result = result.data[0];
      return Promise.resolve(hook);
    });
  };
};
