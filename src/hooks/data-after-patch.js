// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return (hook) => {
    hook.bypass = true
    return hook.app.service('datasources').find({
      query: {
        id: hook.id,
        $select: ['id', 'projectId', 'name', 'meta', 'style', 'company.data', 'priority', 'createdAt', 'progress']
      }
    }).then(result => {
      hook.result = result[0]
      return Promise.resolve(hook)
    })
  }
}
