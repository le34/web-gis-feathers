// Initializes the `styles` service on path `/styles`
const createService = require('feathers-sequelize')
const createModel = require('../../models/styles.model')
const hooks = require('./styles.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'styles',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/styles', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('styles')

  service.hooks(hooks)
}
