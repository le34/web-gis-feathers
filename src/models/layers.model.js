// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const layers = sequelizeClient.define('layers', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isDark: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isBasemap: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  })

  layers.associate = function (models) { // eslint-disable-line no-unused-vars
    models.layers.belongsTo(models.projects, { onDelete: 'CASCADE' }) // generates projectId
    models.layers.belongsTo(models.styles, { onDelete: 'CASCADE' }) // generates styleId
    models.layers.belongsTo(models.users) // generates userId
  }

  return layers
}
