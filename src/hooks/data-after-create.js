// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return (hook) => {
    return hook.app.service('/data').find({
      query: {
        id: hook.result.id,
        $select: ['id', 'projectId', 'name', 'createdAt', 'progress']
      }
    }).then(result => {
      hook.result = result[0]
      return Promise.resolve(hook)
    })
  }
}
