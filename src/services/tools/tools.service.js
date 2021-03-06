// Initializes the `tools` service on path `/tools`
const createService = require('feathers-sequelize')
const createModel = require('../../models/tools.model')
const hooks = require('./tools.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'tools',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/tools', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tools')

  service.hooks(hooks)
}
