// Initializes the `totals` service on path `/totals`
const createService = require('./totals.class.js')
const hooks = require('./totals.hooks')

module.exports = function () {
  const app = this
  const paginate = app.get('paginate')

  const options = {
    name: 'totals',
    connectionString: app.get('postgres'),
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/totals', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('totals')

  service.hooks(hooks)
}
