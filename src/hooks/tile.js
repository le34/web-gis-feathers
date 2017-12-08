// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const Tiler = require('../tiler.js')
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function tile (hook) {
    const service = hook.app.service('data')
    if (hook.data.geojson) {
      const tiler = new Tiler(hook.result.id, hook.data, service)
      tiler.create()
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    } else {
      service.patch(hook.result.id, { progress: 100 })
    }
    return Promise.resolve(hook)
  }
}
