// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function tile (hook) {
    if (hook.data.geojson && hook.data.geojson.features) {
      const service = hook.app.service('geometries')
      hook.data.geojson.features.forEach(feature => {
        /*
        const properties = Object.assign({}, feature.properties)
        if (properties.hasOwnProperty('Længde')) {
          properties['Længde'] = parseFloat(properties['Længde'])
        }
        if (properties.hasOwnProperty('Areal')) {
          properties['Areal'] = parseFloat(properties['Areal'])
        }
        if (properties.hasOwnProperty('HalvPerimeter')) {
          properties['HalvPerimeter'] = parseFloat(properties['HalvPerimeter'])
        }
        */
        const geometry = Object.assign({}, feature.geometry)
        geometry.crs = { type: 'name', properties: { name: 'EPSG:4326' } }
        service.create({dataId: hook.result.id, properties: feature.properties, geom: geometry})
      })
    }
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook)
  }
}
