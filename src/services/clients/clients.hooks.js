
const clientsBefore = require('../../hooks/clients-before')
const getAfter = require('../../hooks/get-after')
const { associateCurrentUser } = require('feathers-authentication-hooks')
module.exports = {
  before: {
    all: [],
    find: [clientsBefore()],
    get: [clientsBefore()],
    create: [associateCurrentUser({ idField: 'id' })],
    update: [associateCurrentUser({ idField: 'id' })],
    patch: [associateCurrentUser({ idField: 'id' })],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [getAfter()],
    update: [getAfter()],
    patch: [getAfter()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
