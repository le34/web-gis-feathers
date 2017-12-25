// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return hook => {
    return hook.app.service('datasources').get(hook.id).then(result => {
      hook.params.data = result
      return Promise.resolve(hook)
    })
  }
}
