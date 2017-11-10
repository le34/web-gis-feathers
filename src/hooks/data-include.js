// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return (hook) => {
    hook.params.sequelize = {
      include: [
        { model: hook.app.services.users.Model },
        { model: hook.app.services.company.Model },
        { model: hook.app.services.company.Model, as: 'client' }
      ]
    }
    return Promise.resolve(hook)
  }
}
