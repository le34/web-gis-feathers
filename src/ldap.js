class LDAPVerifier {
  constructor (app, options = {}) {
    this.app = app
    this.options = options
    this.service = typeof options.service === 'string' ? app.service(options.service) : options.service
    if (!this.service) {
      throw new Error(`options.service does not exist.\n\tMake sure you are passing a valid service path or service instance and it is initialized before ldap.js.`)
    }
    this.verify = this.verify.bind(this)
  }
  _normalizeResult (results) {
    // Paginated services return the array of results in the data attribute.
    let entities = results.data ? results.data : results
    let entity = entities[0]

    // Handle bad username.
    if (!entity) {
      return Promise.reject(false); // eslint-disable-line
    }
    return Promise.resolve(entity)
  }
  verify (req, user, done) {
    const id = this.service.id
    const usernameField = this.options.entityUsernameField || this.options.usernameField
    const params = {
      'query': {
        [usernameField]: user.mail,
        '$limit': 1
      }
    }

    if (id === null || id === undefined) {
      return done(new Error('the `id` property must be set on the entity service for authentication'))
    }

    // Look up the entity
    this.service.find(params).then(response => {
      const results = response.data || response
      if (!results.length) {
        return this.service.create({email: user.mail, name: user.cn, companyId: '6714a515-bec0-4d2b-a5e4-76d16cb845c0'}).then(response => {
          return this._normalizeResult([response])
        })
      }
      return this._normalizeResult(response)
    }).then(entity => {
      const id = entity[this.service.id]
      const payload = { [`${this.options.entity}Id`]: id }
      done(null, entity, payload)
    }).catch(error => error ? done(error) : done(null, error, { message: 'Invalid login' }))
  }
}

module.exports = LDAPVerifier
