const { authenticate } = require('@feathersjs/authentication').hooks
// const { discard } = require('feathers-hooks-common')
const tile = require('../../hooks/tile')
const removeMbtile = require('../../hooks/remove-mbtile')
const dataBeforeFind = require('../../hooks/data-before-find')
// const noReturning = require('../../hooks/no-returning')
const dataAfterPatch = require('../../hooks/data-after-patch')
const dataAfterCreate = require('../../hooks/data-after-create')
// const createGeometries = require('../../hooks/create-geometries')

module.exports = {
  before: {
    all: [ ],
    find: [dataBeforeFind()],
    get: [dataBeforeFind()],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')], //, noReturning()],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [tile(), dataAfterCreate()],
    update: [tile(), dataAfterCreate()],
    patch: [dataAfterPatch()],
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
