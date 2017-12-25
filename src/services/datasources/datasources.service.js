// Initializes the `data` service on path `/data`
const createService = require('feathers-sequelize')
const createModel = require('../../models/datasources.model')
const hooks = require('./datasources.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'datasources',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/datasources', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('datasources')

  service.hooks(hooks)
}
