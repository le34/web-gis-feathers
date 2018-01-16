// Initializes the `datasourcetypes` service on path `/datasourcetypes`
const createService = require('feathers-sequelize')
const createModel = require('../../models/datasourcetypes.model')
const hooks = require('./datasourcetypes.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'datasourcetypes',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/datasourcetypes', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('datasourcetypes')

  service.hooks(hooks)
}
