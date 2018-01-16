const { authenticate } = require('@feathersjs/authentication').hooks
const { associateCurrentUser } = require('feathers-authentication-hooks')
const projectsToolsBefore = require('../../hooks/projects-tools-before')
const getAfter = require('../../hooks/get-after')
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [projectsToolsBefore()],
    get: [projectsToolsBefore()],
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
