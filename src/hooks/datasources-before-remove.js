// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    await context.app.service('styles').remove(null, {
      query: {
        datasourceId: context.id
      }
    })
    return context
  }
}
