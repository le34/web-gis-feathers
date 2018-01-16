// Use this context to manipulate incoming or outgoing data.
// For more information on contexts see: http://docs.feathersjs.com/api/contexts.html
const fs = require('fs')
const path = require('path')
const Tiler = require('../tiler.js')
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return context => {
    Promise.resolve().then(() => {
      console.log(context.data)
      if (context.data.geojson) {
        return context.data.geojson
      } else if (context.data.data && context.data.data.tile) {
        return context.app.service('db').get(context.result.id)
      }
    }).then(geojson => {
      if (geojson) {
        console.log('geojson')
        fs.unlink(path.join(process.env.MBTILES, context.id + '.mbtiles'), err => {
          if (err) {
            console.log('remove-mbtile', err)
          }

          context.data.geojson = geojson
          const tiler = new Tiler(context.result.id, context.data, context.service)
          tiler.create()
          const geometryService = context.app.service('geometries')
          let data = []
          context.data.geojson.features.forEach(feature => {
            const geometry = Object.assign({}, feature.geometry)
            geometry.crs = { type: 'name', properties: { name: 'EPSG:4326' } }
            data.push({datasourceId: context.result.id, properties: feature.properties, geom: geometry})
          })
          geometryService.remove(null, {
            query: {
              datasourceId: context.result.id
            }
          }).then(res => {
            geometryService.create(data)
          })
        })
      } else {
        console.log('patch')
        context.service.patch(context.result.id, { progress: 100 })
      }
    })
    return context
  }
}
