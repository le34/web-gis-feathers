// Initializes the `fonts` service on path `/fonts`
const createService = require('./fonts.class.js')
const hooks = require('./fonts.hooks')
const filters = require('./fonts.filters')

module.exports = function () {
  const app = this
  const paginate = app.get('paginate')

  const options = {
    name: 'fonts',
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/fonts', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('fonts')

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}
