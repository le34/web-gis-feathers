// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const Tiler = require('../tiler.js')
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function tile (hook) {
    const service = hook.app.service('data')
    const tiler = new Tiler(hook.result, service)
    tiler.create()
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook)
  }
}
