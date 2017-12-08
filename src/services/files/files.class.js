const fs = require('fs')
const path = require('path')
const filePath = process.env.MBTILES

class Service {
  constructor (options) {
    this.options = options || {}
  }

  find (params) {
    return new Promise((resolve, reject) => {
      fs.readdir(filePath, (err, files) => {
        if (err) {
          return reject(err)
        }
        const result = files.filter(file => {
          return path.extname(file) === '.mbtiles'
        }).map(file => {
          return { id: path.basename(file, path.extname(file)) }
        })
        resolve(result)
      })
    })
  }

  get (id, params) {
    console.log(params)
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(filePath, id + '.mbtiles'), (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })
    })
  }

  create (data, params) {
    console.log('create', data, params)
    /*
    if (params.file && data.id) {
      return new Promise((resolve, reject) => {
        fs.writeFile(path.join(filePath, data.id + '.mbtiles'), params.file.buffer, err => {
          if (err) {
            console.log('file error', err)
            return reject(err)
          }
          return resolve(data)
        })
      })
    }
    */
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
