/* eslint-disable no-unused-vars */
const { Pool } = require('pg')

class Service {
  constructor (options) {
    this.options = options || {}
    this.pool = new Pool({
      connectionString: options.connectionString
    })
  }

  find (params) {
    return new Promise((resolve, reject) => {
      let sql = `
      select a.id, count(*)::integer as antal, a.st_geometrytype, sum(a.st_length) as st_length, sum(a.st_area) as st_area, sum(a.st_perimeter) as st_perimeter from (
        select
          COALESCE(properties->>'feature', "dataId"::text) as id, 
          st_geometrytype(geom) as st_geometrytype, 
          st_length(st_transform(geom, 25832)) as st_length, 
          st_area(st_transform(geom, 25832)) as st_area, 
          st_perimeter(st_transform(geom, 25832)) as st_perimeter
        from geometries
      `
      if (params.query) {
        if (params.query.dataId) {
          sql += 'where "dataId"=\'' + params.query.dataId + '\''
        } else if (params.query.projectId) {
          sql += 'inner join data on geometries."dataId" = data.id where data."projectId" = \'' + params.query.projectId + '\''
        }
      }
      if (params.query.geojson && params.query.geojson.features.length > 0) {
        sql += ' and '
        params.query.geojson.features.forEach(feature => {
          sql += 'ST_Contains(ST_SetSRID(ST_GeomFromGeoJSON(\'' + JSON.stringify(feature.geometry) + '\'),4326), geom) or '
        })
        sql = sql.substring(0, sql.length - 3)
      }

      sql += `) as a
      group by a.id, a.st_geometrytype`
      console.log(sql)
      this.pool.query(sql, (err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res.rows)
      })
    })
  }

  get (id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    })
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
