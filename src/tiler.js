/* eslint no-new: 0 */
var geojsonvt = require('geojson-vt')
var MBTiles = require('@mapbox/mbtiles')
var path = require('path')
var vtpbf = require('vt-pbf')
var zlib = require('zlib')
var fs = require('fs')
var bbox = require('@turf/bbox')
var centerOfMass = require('@turf/center-of-mass')
const filePath = process.env.MBTILES
module.exports = Tiler

function Tiler (id, data, service) {
  this._service = service
  this._features = []
  this._current = 0
  this._last = 0
  this._data = Object.assign({}, data)
  this._id = id
  // this._mbtilesFile = path.join(__dirname, 'data', data.id + '.mbtiles')
  this._mbtilesFile = path.join(filePath, id + '.mbtiles')
}

Tiler.prototype.remove = function () {
  return new Promise((resolve, reject) => {
    fs.unlink(this._mbtilesFile, () => {
      resolve()
    })
  })
}

Tiler.prototype.putTile = function () {
  if (this._current !== this._tileIndex.tileCoords.length) {
    const item = this._tileIndex.tileCoords[this._current]
    const progress = Math.round(100 * (this._current + 1) / this._tileIndex.tileCoords.length)
    return Promise.resolve().then(() => {
      if (progress > this._last) {
        this._last = progress
        return this._service.patch(this._id, { progress })
      }
    }).then(() => {
      var tile = this._tileIndex.getTile(item.z, item.x, item.y)
      var layers = {}
      tile.features.forEach((feature) => {
        let layername = feature.tags.feature || this._id
        if (this._features.indexOf(layername) === -1) {
          this._features.push(layername)
        }
        if (!layers.hasOwnProperty(layername)) {
          layers[layername] = []
        }
        layers[layername].push(feature)
      })
      var layers2 = {}
      Object.keys(layers).forEach((key) => {
        var layer = new vtpbf.GeoJSONWrapper(layers[key])
        layer.name = key
        layer.version = 2
        layers2[key] = layer
      })
      var buff = vtpbf.fromVectorTileJs({
        layers: layers2
      })
      var buffer = Buffer.from(buff)
      return new Promise((resolve, reject) => {
        zlib.gzip(buffer, (err, result) => {
          if (err) {
            return reject(err)
          }
          resolve(result)
        })
      })
    }).then(result => {
      return new Promise((resolve, reject) => {
        this._mbtiles.putTile(item.z, item.x, item.y, result, (err) => {
          if (err) {
            return reject(err)
          }
          resolve()
        })
      })
    }).then(() => {
      this._current++
      return this.putTile()
    })
  }
}

Tiler.prototype.create = function () {
  return Promise.resolve().then(() => {
    return geojsonvt(this._data.geojson, { debug: 0, maxZoom: 20, indexMaxZoom: 20, indexMaxPoints: 0 })
  }).then((tileIndex) => {
    this._tileIndex = tileIndex
    return this.remove()
  }).then(() => {
    return new Promise((resolve, reject) => {
      new MBTiles(this._mbtilesFile, (err, mbtiles) => {
        if (err) {
          reject(err)
        } else {
          resolve(mbtiles)
        }
      })
    })
  }).then((mbtiles) => {
    this._mbtiles = mbtiles
    return new Promise((resolve, reject) => {
      mbtiles.startWriting(err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }).then(() => {
    return this.putTile()
  }).then(() => {
    var center = centerOfMass(this._data.geojson)
    return new Promise((resolve, reject) => {
      this._mbtiles.putInfo({
        bounds: bbox(this._data.geojson),
        center: [center.geometry.coordinates[0], center.geometry.coordinates[1], 16],
        version: '2',
        name: this._id,
        description: this._data.name,
        type: 'overlay',
        format: 'pbf',
        'vector_layers': this._features.map((id) => {
          return {
            id: id, description: '', minzoom: 0, maxzoom: 22, fields: {}
          }
        })
      }, (err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      this._mbtiles.stopWriting((err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  }).then(() => {
    return new Promise((resolve, reject) => {
      this._mbtiles.close((err) => {
        if (err) {
          return reject(err)
        }
        console.log('closed')
        resolve()
      })
    })
  })
}
