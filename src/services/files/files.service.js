// Initializes the `files` service on path `/files`
const createService = require('./files.class.js')
const hooks = require('./files.hooks')
const filters = require('./files.filters')
/*
const blobService = require('feathers-blob')
const fs = require('fs-blob-store')
const path = require('path')
const filePath = process.env.MBTILES || path.join(__dirname, '../../../../../survey/mbtiles')
const blobStorage = fs(filePath)
*/
const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.MBTILES)
  },
  filename: function (req, file, cb) {
    cb(null, req.body.id + '.mbtiles')
  }
})
const multipartMiddleware = multer({storage})
module.exports = function () {
  const app = this
  const paginate = app.get('paginate')

  const options = {
    name: 'files',
    paginate
  }
  // app.use('/files', blobService({Model: blobStorage}))
  app.use('/files', multipartMiddleware.single('mbtile'), createService(options))
  // Initialize our service with any options it requires
  // app.use('/files', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('files')

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}
