// Initializes the `codetables` service on path `/codetables`
const createService = require('./codetables.class.js')
const hooks = require('./codetables.hooks')

module.exports = function (app) {
  const paginate = app.get('paginate')

  const options = {
    name: 'codetables',
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/codetables', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('codetables')

  service.hooks(hooks)
}
