// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const geometries = sequelizeClient.define('geometries', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    properties: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    geom: {
      type: DataTypes.GEOMETRY,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  })

  geometries.associate = function (models) { // eslint-disable-line no-unused-vars
    models.geometries.belongsTo(models.datasources, { onDelete: 'CASCADE' })
  }

  return geometries
}
