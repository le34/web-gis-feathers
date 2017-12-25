// Initializes the `projects-styles` service on path `/projects-styles`
const createService = require('feathers-sequelize')
const createModel = require('../../models/projects-styles.model')
const hooks = require('./projects-styles.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'projects-styles',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/projects-styles', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('projects-styles')

  service.hooks(hooks)
}
