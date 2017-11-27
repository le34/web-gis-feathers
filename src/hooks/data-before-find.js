// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return (hook) => {
    console.log(hook.params)
    hook.params.sequelize = {
      include: [
        { model: hook.app.services.company.Model, attributes: ['data'] }
      ]
    }
    return hook
  }
}
