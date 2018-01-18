// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return context => {
    context.params.sequelize = {
      include: [
        { model: context.app.services.users.Model, attributes: ['email'] },
        { model: context.app.services.projects.Model },
        { model: context.app.services.datasources.Model }
      ]
    }
    return context
  }
}
