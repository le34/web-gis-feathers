// Initializes the `projectcompany` service on path `/projectcompany`
const createService = require('feathers-sequelize')
const createModel = require('../../models/projects-companies.model')
const hooks = require('./projects-companies.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'projects-companies',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/projects-companies', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('projects-companies')

  service.hooks(hooks)
}
