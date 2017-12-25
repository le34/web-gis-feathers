/* eslint-disable no-unused-vars */
// const { Pool } = require('pg')
const Sequelize = require('sequelize')
const parse = require('wellknown')
const reproj = require('reproject')
var epsg = require('epsg')

class Service {
  constructor (options) {
    this.options = options || {}
  }

  find (params) {
    return Promise.resolve([])
  }

  get (id, params) {
    // return new Promise((resolve, reject) => {
    /*
    const pool = new Pool({
        connectionString: params.data.meta.connectionString
      }) */
    const mssql = params.data.meta.connectionString.indexOf('mssql') === 0
    const sequelize = new Sequelize(params.data.meta.connectionString)
    let sql = `select st_asgeojson(st_extent(st_transform(${params.data.meta.geometryColumn},4326)),10) from ${params.data.meta.dbTable}`
    if (mssql) {
      sql = `select a.geom.STAsText() as wkt, a.geom.STSrid as srid from (select GEOMETRY::EnvelopeAggregate(${params.data.meta.geometryColumn}) as geom from ${params.data.meta.dbTable}) as a`
    }
    return sequelize.query(sql, { type: sequelize.QueryTypes.SELECT }).then(res => {
      if (res.length > 0) {
        const item = res[0]
        if (mssql) {
          const geojson = parse(item.wkt)
          return {
            id: id,
            type: 'Feature',
            properties: {},
            geometry: reproj.toWgs84(geojson, `EPSG:${item.srid}`, epsg)
          }
        }
        return {
          id: id,
          type: 'Feature',
          properties: {},
          geometry: JSON.parse(item.st_asgeojson)
        }
      }
    })
    /*
    pool.query(sql, (err, res) => {
      if (err) {
        return reject(err)
      }
      const geojson = {
        id: id,
        type: 'Feature',
        properties: {},
        geometry: JSON.parse(res.rows[0].st_asgeojson)
      }
      resolve(geojson)
    })
    */
    // })
  }

  create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)))
    }

    return Promise.resolve(data)
  }

  update (id, data, params) {
    return Promise.resolve(data)
  }

  patch (id, data, params) {
    return Promise.resolve(data)
  }

  remove (id, params) {
    return Promise.resolve({ id })
  }
}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service
