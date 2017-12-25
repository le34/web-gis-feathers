// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const fs = require('fs')
const path = require('path')
const Tiler = require('../tiler.js')
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function tile (hook) {
    const service = hook.app.service('datasources')
    Promise.resolve().then(() => {
      if (hook.data.geojson) {
        return hook.data.geojson
      } else if (hook.data.meta && hook.data.meta.tile) {
        return hook.app.service('db').get(hook.result.id)
      }
    }).then(geojson => {
      if (geojson) {
        console.log('geojson')
        fs.unlink(path.join(process.env.MBTILES, hook.id + '.mbtiles'), err => {
          if (err) {
            console.log('remove-mbtile', err)
          }

          hook.data.geojson = geojson
          const tiler = new Tiler(hook.result.id, hook.data, service)
          tiler.create()
          const geometryService = hook.app.service('geometries')
          let data = []
          hook.data.geojson.features.forEach(feature => {
            const geometry = Object.assign({}, feature.geometry)
            geometry.crs = { type: 'name', properties: { name: 'EPSG:4326' } }
            data.push({dataId: hook.result.id, properties: feature.properties, geom: geometry})
          })
          geometryService.remove(null, {
            query: {
              dataId: hook.result.id
            }
          }).then(res => {
            geometryService.create(data)
          })
        })
      } else {
        console.log('patch')
        service.patch(hook.result.id, { progress: 100 })
      }
    })
    return Promise.resolve(hook)
  }
}
