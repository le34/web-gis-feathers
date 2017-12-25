// Initializes the `geometries` service on path `/geometries`
const createService = require('feathers-sequelize')
const createModel = require('../../models/geometries.model')
const hooks = require('./geometries.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'geometries',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/geometries', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('geometries')

  service.hooks(hooks)
}
