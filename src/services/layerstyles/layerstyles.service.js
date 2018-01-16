// Initializes the `layers` service on path `/layers`
const createService = require('feathers-sequelize')
const createModel = require('../../models/layers.model')
const hooks = require('./layerstyles.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'layerstyles',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/layerstyles', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('layerstyles')

  service.hooks(hooks)
}
