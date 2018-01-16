// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return context => {
    context.params.sequelize = {
      include: [
        { model: context.app.services.tools.Model, attributes: ['name'] },
        { model: context.app.services.projects.Model, attributes: ['name'] },
        { model: context.app.services.users.Model, attributes: ['email'] }
      ]
    }
    return context
  }
}
