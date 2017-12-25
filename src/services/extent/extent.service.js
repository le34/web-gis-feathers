// Initializes the `extent` service on path `/extent`
const createService = require('./extent.class.js')
const hooks = require('./extent.hooks')

module.exports = function (app) {
  const paginate = app.get('paginate')

  const options = {
    name: 'extent',
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/extent', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('extent')

  service.hooks(hooks)
}
