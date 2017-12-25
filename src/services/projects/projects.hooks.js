const { authenticate } = require('@feathersjs/authentication').hooks
const { associateCurrentUser } = require('feathers-authentication-hooks')
const projectsBefore = require('../../hooks/projects-before')
const projectsAfter = require('../../hooks/projects-after')
module.exports = {
  before: {
    all: [ ],
    find: [projectsBefore()],
    get: [projectsBefore()],
    create: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    update: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    patch: [authenticate('jwt'), associateCurrentUser({ idField: 'id' })],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [projectsAfter()],
    update: [projectsAfter()],
    patch: [projectsAfter()],
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
