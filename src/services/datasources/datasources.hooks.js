const { authenticate } = require('@feathersjs/authentication').hooks
// const { discard } = require('feathers-hooks-common')
const tile = require('../../hooks/tile')
const removeMbtile = require('../../hooks/remove-mbtile')
const datasourcesBefore = require('../../hooks/datasources-before')
// const noReturning = require('../../hooks/no-returning')
const getAfter = require('../../hooks/get-after')
// const createGeometries = require('../../hooks/create-geometries')
const { associateCurrentUser } = require('feathers-authentication-hooks')
module.exports = {
  before: {
    all: [ ],
    find: [datasourcesBefore()],
    get: [datasourcesBefore()],
    create: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    update: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    patch: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })], //, noReturning()],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [tile(), getAfter()],
    update: [tile(), getAfter()],
    patch: [getAfter()],
    remove: [removeMbtile()]
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
