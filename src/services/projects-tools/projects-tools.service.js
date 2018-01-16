// Initializes the `projects-tools` service on path `/projects-tools`
const createService = require('feathers-sequelize')
const createModel = require('../../models/projects-tools.model')
const hooks = require('./projects-tools.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'projects-tools',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/projects-tools', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('projects-tools')

  service.hooks(hooks)
}
