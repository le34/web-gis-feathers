// Use this context to manipulate incoming or outgoing data.
// For more information on contexts see: http://docs.feathersjs.com/api/contexts.html
const fs = require('fs')
const path = require('path')
const Tiler = require('../tiler.js')
const v4 = require('uuid/v4')
// const util = require('util')
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return context => {
    Promise.resolve().then(() => {
      if (context.data.geojson) {
        return context.data.geojson
      } else if (context.data.data && context.data.data.tile) {
        return context.app.service('db').get(context.result.id)
      }
    }).then(geojson => {
      if (geojson) {
        const geometryService = context.app.service('geometries')
        console.log('geojson')
        return new Promise((resolve, reject) => {
          fs.unlink(path.join(process.env.MBTILES, context.result.id + '.mbtiles'), err => {
            if (err) {
              console.log('remove-mbtile', err)
            }
            resolve()
          })
        }).then(() => {
          context.data.geojson = geojson
          const tiler = new Tiler(context.result.id, context.data, context.service)
          return tiler.create()
        }).then(() => {
          return geometryService.remove(null, {
            query: {
              datasourceId: context.result.id
            }
          })
        }).then(() => {
          let data = []
          context.data.geojson.features.forEach(feature => {
            const geometry = Object.assign({}, feature.geometry)
            geometry.crs = { type: 'name', properties: { name: 'EPSG:4326' } }
            data.push({datasourceId: context.result.id, properties: feature.properties, geom: geometry})
          })
          return geometryService.create(data)
        })
      }
    }).then(() => {
      return context.service.patch(context.result.id, { progress: 100 })
    }).then(() => {
      if (context.method === 'create') {
        Promise.resolve().then(() => {
          let style = {
            name: context.data.name,
            projectId: context.data.projectId,
            dark: {
              version: 8,
              sources: {
              },
              layers: [{
                id: 'background',
                type: 'background',
                paint: {
                  'background-color': '#000000'
                }
              }]
            },
            light: {
              version: 8,
              sources: {
              },
              layers: [{
                id: 'background',
                type: 'background',
                paint: {
                  'background-color': '#ffffff'
                }
              }]
            }
          }
          if (context.result.datasourcetypeId < 3) {
            let codeTables = {}
            return context.app.service('tiles').get(context.result.id).then(tileJson => {
              if (tileJson.format === 'pbf') {
                let sources = {
                  [context.result.id]: {
                    type: 'vector',
                    tiles: tileJson.tiles,
                    minzoom: tileJson.minzoom,
                    maxzoom: tileJson.maxzoom,
                    bounds: tileJson.bounds
                  }
                }
                style.light.sources = sources
                style.dark.sources = sources
                const promises = []
                tileJson.vector_layers.forEach(data => {
                  if (data.id) {
                    const layerid = data.id.split('#')
                    if (layerid.length > 1) {
                      const kode = layerid[0]
                      if (!codeTables.hasOwnProperty(kode)) {
                        promises.push(context.app.service('codetables').get(kode))
                        codeTables[kode] = {}
                      }
                    }
                  }
                })
                return Promise.all(promises).then(items => {
                  items.forEach(item => {
                    codeTables[item.id] = item.layers
                  })
                  tileJson.vector_layers.forEach(data => {
                    const layerid = data.id.split('#')
                    if (layerid.length > 1) {
                      const kode = layerid[0]
                      const name = data.id.substr(kode.length + 1)
                      const kodetabel = codeTables[kode]
                      if (kodetabel.hasOwnProperty(name)) {
                        let id = v4()
                        let layerlight = JSON.parse(
                          JSON.stringify(kodetabel[name])
                        )
                        let layerdark = JSON.parse(
                          JSON.stringify(kodetabel[name])
                        )
                        layerlight.id = id
                        layerdark.id = id
                        layerlight.metadata = { name: layerlight.name || name }
                        layerdark.metadata = { name: layerdark.name || name }
                        layerlight.source = context.result.id
                        layerdark.source = context.result.id
                        layerlight['source-layer'] = data.id
                        layerdark['source-layer'] = data.id
                        delete layerlight.name
                        delete layerdark.name
                        delete layerlight.category
                        delete layerdark.category
                        if (layerlight.paint.hasOwnProperty('line-color') && layerlight.paint['line-color'] === '#ffffff') {
                          layerlight.paint['line-color'] = '#000000'
                        } else if (layerlight.paint.hasOwnProperty('circle-color') && layerlight.paint['circle-color'] === '#ffffff') {
                          layerlight.paint['circle-color'] = '#000000'
                        }
                        style.light.layers.push(layerlight)
                        if (layerdark.paint.hasOwnProperty('line-color') && layerdark.paint['line-color'] === '#000000') {
                          layerdark.paint['line-color'] = '#ffffff'
                        } else if (layerdark.paint.hasOwnProperty('circle-color') && layerdark.paint['circle-color'] === '#000000') {
                          layerdark.paint['circle-color'] = '#ffffff'
                        }
                        style.dark.layers.push(layerdark)
                      }
                    } else {
                      const layerCircle = {
                        id: v4(),
                        metadata: { name: data.id },
                        source: context.result.id,
                        'source-layer': data.id,
                        type: 'circle',
                        paint: { 'circle-color': '#FF0000' }
                      }
                      const layerLine = {
                        id: v4(),
                        metadata: { name: data.id },
                        source: context.result.id,
                        'source-layer': data.id,
                        type: 'line',
                        paint: { 'line-color': '#FF0000' }
                      }
                      style.light.layers.push(layerCircle)
                      style.light.layers.push(layerLine)
                      style.dark.layers.push(layerCircle)
                      style.dark.layers.push(layerLine)
                    }
                  })
                  return style
                })
              } else {
                const sources = {
                  [context.result.id]: {
                    type: 'raster',
                    tiles: tileJson.tiles,
                    minzoom: tileJson.minzoom,
                    maxzoom: tileJson.maxzoom,
                    bounds: tileJson.bounds,
                    tileSize: 256
                  }
                }
                const layer = {
                  id: v4(),
                  type: 'raster',
                  source: context.result.id,
                  metadata: context.result.name
                }
                style.light.sources = sources
                style.dark.sources = sources
                style.light.layers.push(layer)
                style.dark.layers.push(layer)
                return style
              }
            })
          } else {
            const sources = {
              [context.result.id]: {
                type: 'geojson',
                data: `${process.env.FEATHERS}/db/${context.result.id}`
              }
            }
            const layerCircle = {
              id: v4(),
              source: context.result.id,
              type: 'circle',
              paint: { 'circle-color': '#FF0000' }
            }
            const layerLine = {
              id: v4(),
              source: context.result.id,
              type: 'line',
              paint: { 'line-color': '#FF0000' }
            }
            style.light.sources = sources
            style.dark.sources = sources
            style.light.layers.push(layerCircle)
            style.light.layers.push(layerLine)
            style.dark.layers.push(layerCircle)
            style.dark.layers.push(layerLine)
            return style
          }
        }).then(style => {
          // console.log(util.inspect(style, {depth: null, colors: true}))
          style.datasourceId = context.result.id
          return context.app.service('styles').create(style, context.params)
        }).then(style => {
          context.app.service('layers').create({
            projectId: context.result.projectId,
            styleId: style.id,
            name: style.name
          }, context.params)
        })
      }
    })
    return context
  }
}
