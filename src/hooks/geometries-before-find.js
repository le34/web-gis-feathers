// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const Sequelize = require('sequelize')
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return (hook) => {
    hook.params.$pagination = false
    hook.params.sequelize = {
      attributes: [
        [Sequelize.fn('SUM', Sequelize.cast(Sequelize.json('properties.HalvPerimeter'), 'float')), 'length'],
        [Sequelize.json('properties.feature'), 'feature']
      ],
      group: ['feature']
    }
    return hook
  }
}
