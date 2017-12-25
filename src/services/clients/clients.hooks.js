
const clientsBefore = require('../../hooks/clients-before')
const clientsAfter = require('../../hooks/clients-after')
module.exports = {
  before: {
    all: [],
    find: [clientsBefore()],
    get: [clientsBefore()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [clientsAfter()],
    update: [clientsAfter()],
    patch: [clientsAfter()],
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
