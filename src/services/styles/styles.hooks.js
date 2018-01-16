const { authenticate } = require('@feathersjs/authentication').hooks
const { associateCurrentUser } = require('feathers-authentication-hooks')
const stylesBefore = require('../../hooks/styles-before')
const getAfter = require('../../hooks/get-after')
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [stylesBefore()],
    get: [stylesBefore()],
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
