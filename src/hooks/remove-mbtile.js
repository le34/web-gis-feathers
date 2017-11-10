// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const fs = require('fs')
const path = require('path')
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function removeMbtile (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    fs.unlink(path.join(process.env.MBTILES, hook.id + '.mbtiles'))
    return Promise.resolve(hook)
  }
}
