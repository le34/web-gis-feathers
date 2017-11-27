/* eslint no-new: 0 */
var geojsonvt = require('geojson-vt')
var MBTiles = require('@mapbox/mbtiles')
var path = require('path')
var vtpbf = require('vt-pbf')
var zlib = require('zlib')
var fs = require('fs')
var bbox = require('@turf/bbox')
var centerOfMass = require('@turf/center-of-mass')
module.exports = Tiler

function Tiler (data, service) {
  this._service = service
  this._features = []
  this._current = 0
  this._last = 0
  this._data = Object.assign({}, data)
  // this._mbtilesFile = path.join(__dirname, 'data', data.id + '.mbtiles')
  this._mbtilesFile = path.join(process.env.MBTILES, data.id + '.mbtiles')
}

Tiler.prototype.remove = function () {
  return new Promise((resolve, reject) => {
    fs.unlink(this._mbtilesFile, () => {
      resolve()
    })
  })
}

Tiler.prototype.putTile = function () {
  if (this._current === this._tileIndex.tileCoords.length) {
    var center = centerOfMass(this._data.geojson)
    this._mbtiles.putInfo({
      bounds: bbox(this._data.geojson),
      center: [center.geometry.coordinates[0], center.geometry.coordinates[1], 16],
      version: '2',
      name: this._data.id,
      description: this._data.name,
      type: 'overlay',
      format: 'pbf',
      'vector_layers': this._features.map((id) => {
        return {
          id: id, description: '', minzoom: 0, maxzoom: 22, fields: {}
        }
      })
    }, () => {
      this._mbtiles.stopWriting(() => {
        this._mbtiles.close(() => {
          console.log('closed')
        })
      })
    })
  } else {
    const progress = Math.round(100 * (this._current + 1) / this._tileIndex.tileCoords.length)
    Promise.resolve().then(() => {
      if (progress > this._last) {
        this._last = progress
        return this._service.patch(this._data.id, { progress })
      }
    }).then(() => {
      const item = this._tileIndex.tileCoords[this._current]
      var tile = this._tileIndex.getTile(item.z, item.x, item.y)
      var layers = {}
      tile.features.forEach((feature) => {
        if (this._features.indexOf(feature.tags.feature) === -1) {
          this._features.push(feature.tags.feature)
        }
        if (!layers.hasOwnProperty(feature.tags.feature)) {
          layers[feature.tags.feature] = []
        }
        layers[feature.tags.feature].push(feature)
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
      zlib.gzip(buffer, (err, result) => {
        if (!err) {
          this._mbtiles.putTile(item.z, item.x, item.y, result, () => {
            this._current++
            this.putTile()
          })
        }
      })
    })
  }
}

Tiler.prototype.create = function () {
  Promise.resolve().then(() => {
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
    this.putTile()
  }).catch((err) => {
    console.log(err)
  })
}
