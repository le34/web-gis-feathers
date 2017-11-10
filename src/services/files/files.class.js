const fs = require('fs')
const path = require('path')
class Service {
  constructor (options) {
    this.options = options || {}
  }

  find (params) {
    return new Promise((resolve, reject) => {
      fs.readdir(path.join(__dirname, '../../../mbtiles'), (err, files) => {
        if (err) {
          return reject(err)
        }
        const result = files.filter(file => {
          return path.extname(file) === '.mbtiles'
        }).map(file => {
          return { name: path.basename(file, path.extname(file)) }
        })
        resolve(result)
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
