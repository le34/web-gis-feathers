const users = require('./users/users.service.js')
const roles = require('./roles/roles.service.js')
const email = require('./email/email.service.js')
const company = require('./company/company.service.js')
const cvr = require('./cvr/cvr.service.js')

const fonts = require('./fonts/fonts.service.js')

const files = require('./files/files.service.js')

const data = require('./data/data.service.js')

const projects = require('./projects/projects.service.js')

const geometries = require('./geometries/geometries.service.js')

const totals = require('./totals/totals.service.js')

module.exports = function () {
  const app = this // eslint-disable-line no-unused-vars
  app.configure(users)
  app.configure(roles)
  app.configure(email)
  app.configure(company)
  app.configure(cvr)
  app.configure(fonts)
  app.configure(files)
  app.configure(data)
  app.configure(projects)
  app.configure(geometries)
  app.configure(totals)
}
