// Initializes the `db` service on path `/db`
const createService = require('./db.class.js')
const hooks = require('./db.hooks')

module.exports = function (app) {
  const paginate = app.get('paginate')

  const options = {
    name: 'db',
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/db', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('db')

  service.hooks(hooks)
}
