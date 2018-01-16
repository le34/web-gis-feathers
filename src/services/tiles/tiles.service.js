// Initializes the `tiles` service on path `/tiles`
const zlib = require('zlib')
const createService = require('./tiles.class.js')
const hooks = require('./tiles.hooks')
const sharp = require('sharp')
let empty = null
sharp({
  create: {
    width: 256,
    height: 256,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  }
}).png().toBuffer().then(buffer => {
  empty = buffer
})
module.exports = function (app) {
  const paginate = app.get('paginate')

  const options = {
    name: 'tiles',
    paginate
  }
  // Initialize our service with any options it requires
  app.use('/tiles', createService(options), (req, res, next) => {
    if (res.hook.params.query.hasOwnProperty('format')) {
      if (res.hook.params.query.format === 'png') {
        res.set('Content-Type', 'image/png')
        if (res.data) {
          res.send(res.data)
        } else {
          console.log('empty')
          res.send(empty)
        }
      } else {
        res.set('Content-Encoding', 'gzip')
        res.set('Content-Type', 'application/x-protobuf')
        const isGzipped = res.data.slice(0, 2).indexOf(Buffer.from([0x1f, 0x8b])) === 0
        if (isGzipped) {
          return res.send(res.data)
        }
        zlib.gzip(res.data, (err, result) => {
          if (err) {
            return res.status(500).json(err)
          }
          res.send(result)
        })
      }
    } else {
      next()
    }
  })

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tiles')

  service.hooks(hooks)
}
