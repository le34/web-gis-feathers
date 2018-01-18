/* eslint-disable no-unused-vars */
const xml2js = require('xml2js')
const path = require('path')
const fs = require('fs')
const iconv = require('iconv-lite')
class Service {
  constructor (options) {
    this.options = options || {}
    this.filePath = process.env.XFM
  }

  async find (params) {
    const files = await new Promise((resolve, reject) => {
      fs.readdir(this.filePath, (err, files) => {
        if (err) {
          return reject(err)
        }
        resolve(files)
      })
    })
    const names = []
    files.forEach(file => {
      let p = path.parse(file)
      if (p.ext === '.xfm') {
        names.push(p.name)
      }
    })
    return names
  }

  get (id, params) {
    return Promise.resolve().then(() => {
      return new Promise((resolve, reject) => {
        fs.readFile(path.join(this.filePath, `${id}.xfm`), function (err, data) {
          if (err) {
            return reject(err)
          }
          resolve(data)
        })
      })
    }).then(data => {
      let encoding = 'iso-8859-1'
      if (data[0] === 255) {
        encoding = 'utf-16'
      }
      data = iconv.decode(data, encoding)
      return new Promise((resolve, reject) => {
        const parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
          if (err) {
            return reject(err)
          }
          resolve(result)
        })
      })
    }).then(result => {
      const json = {
        id: id,
        layers: {}
      }
      result.GeospatialSchema.Workspace[0].Features[0].feature.forEach(element => {
        if (element.hasOwnProperty('X34')) {
          let options = {
            name: element.$.alias,
            category: element.$.category
          }
          element.X34.forEach(style => {
            let width = style.WebGisWidth ? parseInt(style.WebGisWidth[0]) : 2
            width = width > 2 ? width : 2
            const color = style.WebGisColor ? style.WebGisColor[0] : '#000'
            let dash = null
            if (style.WebGisDash) {
              dash = (style.WebGisDash[0].split(' ')).map(item => parseInt(item)).filter(item => { return !isNaN(item) })
              if (dash.length < 2) {
                dash = null
              }
            }
            if (element.Symbology[0].$.type === 'linear') {
              options.type = 'line'
              options.paint = {
                'line-color': color,
                'line-width': width
              }
              if (dash) {
                options.paint['line-dasharray'] = dash
              }
            } else if (element.Symbology[0].$.type === 'cell') {
              options.type = 'circle'
              options.paint = {
                'circle-radius': {
                  'base': 1.75,
                  'stops': [[12, 2], [22, 10]]
                },
                'circle-opacity': 0.7,
                'circle-color': color
                // 'circle-stroke-color': style.WebGisColor ? style.WebGisColor[0] : '#000',
                // 'circle-stroke-width': 2 // parseInt(style.WebGisWidth[0])
              }
            } else if (element.Symbology[0].$.type === 'shape') {
              options.type = 'line'
              options.paint = {
                'line-color': color,
                'line-width': width
                /*
                    'fill-outline-color': style.WebGisColor ? style.WebGisColor[0] : '#000',
                    'fill-color': style.WebGisFillColor ? style.WebGisFillColor[0] : '#000',
                    'fill-opacity': style.WebGisFillOpacity && !isNaN(parseFloat(style.WebGisFillOpacity[0])) ? parseFloat(style.WebGisFillOpacity[0]) : 1
                    */
              }
              if (dash) {
                options.paint['line-dasharray'] = dash
              }
            }
            json.layers[element.$.name] = options
          })
        }
      })
      return json
    }).catch(err => {
      return err
    })
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
