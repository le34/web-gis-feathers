const users = require('./users/users.service.js')
const roles = require('./roles/roles.service.js')
const email = require('./email/email.service.js')
const clients = require('./clients/clients.service.js')
module.exports = function () {
  const app = this // eslint-disable-line no-unused-vars
  app.configure(users)
  app.configure(roles)
  app.configure(email)
  app.configure(clients)
}
