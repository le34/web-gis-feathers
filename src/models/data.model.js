// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const data = sequelizeClient.define('data', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    meta: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    geojson: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    progress: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  })

  data.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.data.belongsTo(models.company) // generates companyId
    models.data.belongsTo(models.company, { as: 'client' }) // generates clientId
    models.data.belongsTo(models.users) // generates userId
  }

  return data
}
