// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const clients = sequelizeClient.define('clients', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  })

  clients.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.clients.belongsTo(models.projects, { onDelete: 'CASCADE' }) // generates projectId
    models.clients.belongsTo(models.companies, { onDelete: 'CASCADE' }) // generates companyId
    models.clients.belongsTo(models.users) // generates userId
  }

  return clients
}
