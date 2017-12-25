// Initializes the `cvr` service on path `/cvr`
const createService = require('feathers-elasticsearch')
const createModel = require('../../models/cvr.model')
const hooks = require('./cvr.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')
  const elasticsearch = {
    index: 'cvr-permanent',
    type: 'virksomhed'
  }
  const options = {
    id: 'id',
    Model,
    elasticsearch,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/cvr', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('cvr')

  service.hooks(hooks)
}
