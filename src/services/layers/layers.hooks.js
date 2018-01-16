const { authenticate } = require('@feathersjs/authentication').hooks
const layersBefore = require('../../hooks/layers-before')
const getAfter = require('../../hooks/get-after')
const { associateCurrentUser } = require('feathers-authentication-hooks')
module.exports = {
  before: {
    all: [],
    find: [layersBefore()],
    get: [layersBefore()],
    create: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    update: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    patch: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    remove: [authenticate('jwt')]
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
