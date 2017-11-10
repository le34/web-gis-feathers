// Initializes the `email` service on path `/email`
const Mailer = require('feathers-mailer')
const hooks = require('./email.hooks')
const smtpTransport = require('nodemailer-smtp-transport')

module.exports = function () {
  const app = this

  // Initialize our service with any options it requires
  app.use('/email', Mailer(smtpTransport(app.get('mail'))))
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('email')

  service.hooks(hooks)
}
