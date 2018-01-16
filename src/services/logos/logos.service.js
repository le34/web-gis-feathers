// Initializes the `logos` service on path `/logos`
const createService = require('feathers-sequelize')
const createModel = require('../../models/logos.model')
const hooks = require('./logos.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'logos',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/logos', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('logos')

  service.hooks(hooks)
}
