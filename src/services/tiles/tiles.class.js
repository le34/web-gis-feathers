/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path')
var MBTiles = require('@mapbox/mbtiles')

const port = process.env.PORT || 3030
const filePath = process.env.MBTILES
const urlPrefix = process.env.URL_PREFIX || 'http://localhost:' + port
class Service {
  constructor (options) {
    this.options = options || {}
  }

  async find (params) {
    return []
  }

  async get (id, params) {
    const mbtilesFile = path.join(filePath, id + '.mbtiles')
    if (params.query.hasOwnProperty('format')) {
      try {
        const z = params.query.z | 0
        const x = params.query.x | 0
        const y = params.query.y | 0
        const format = params.query.format
        const data = await new Promise((resolve, reject) => {
          const source = new MBTiles(mbtilesFile, function (err) {
            if (err) {
              reject(err)
            } else {
              source.getTile(z, x, y, function (err, data, headers) {
                if (err) {
                  reject(err)
                } else {
                  resolve(data)
                }
              })
            }
          })
        })
        return data
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('info')
      const data = await new Promise((resolve, reject) => {
        fs.stat(mbtilesFile, (err, stats) => {
          if (err || !stats.isFile() || stats.size === 0) {
            return reject(err)
          }
          const instance = new MBTiles(mbtilesFile, function (err) {
            if (err) {
              return reject(err)
            }
            instance.getInfo(function (err, info) {
              if (err || !info) {
                return reject(err)
              }
              info.tiles = ['le34://tiles/' + id + '?z={z}&x={x}&y={y}&format=' + info.format]
              resolve(info)
            })
          })
        })
      })
      return data
    }
  }

  async create (data, params) {
    return data
  }

  async update (id, data, params) {
    return data
  }

  async patch (id, data, params) {
    return data
  }

  async remove (id, params) {
    return { id }
  }
}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service
