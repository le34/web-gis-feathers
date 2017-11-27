const rolesData = require('./roles.js')
const usersData = require('./users.js')
const companyData = require('./company.js')
const Tiler = require('../tiler.js')

module.exports = function () {
  const app = this
  const ifEmptyCreate2 = ifEmptyCreate.bind(this)
  app.configure(ifEmptyCreate2('roles', rolesData))
  app.configure(ifEmptyCreate2('users', usersData))
  app.configure(ifEmptyCreate2('company', companyData))
  app.configure(tile)
}

// ### ifEmptyCreate(model, data)
/**
 * If the model is empty then populate it's data
 * @param {object} model Mongoose Model
 * @param {object|object[]} data Object data or Array of Object data to insert
 * @return {function} Returns a method to be called by configure
 */
function ifEmptyCreate (name, data) {
  return async () => {
    try {
      let found = await this.service(name).find({query: {}})
      if (found && Number.isInteger(found.total) && Array.isArray(found.data)) {
        found = found.data
      }
      if (found.length !== 0) { return false }
      await this.service(name).create(data)
      console.log('default ' + name + ' created')
    } catch (err) {
      if (err) { console.log('trouble seeding ' + name + ': ', err) }
    }
  }
}

function tile () {
  const service = this.service('data')
  return service.find({
    query: {
      progress: {
        $lt: 100
      }
    }
  }).then(data => {
    data.forEach(item => {
      const tiler = new Tiler(item, service)
      tiler.create()
    })
  }).catch(function (error) {
    console.error(error)
  })
}
