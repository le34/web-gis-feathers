// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const datasources = sequelizeClient.define('datasources', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: true
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

  datasources.associate = function (models) { // eslint-disable-line no-unused-vars
    models.datasources.belongsTo(models.projects, { onDelete: 'CASCADE' }) // generates projectId
    models.datasources.belongsTo(models.companies, { onDelete: 'CASCADE' }) // generates companyId
    models.datasources.belongsTo(models.users) // generates userId
    models.datasources.belongsTo(models.datasourcetypes) // generates datasourcetypeId
  }

  return datasources
}
