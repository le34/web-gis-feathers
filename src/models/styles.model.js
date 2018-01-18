// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const styles = sequelizeClient.define('styles', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    light: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    dark: {
      type: DataTypes.JSONB,
      allowNull: true
    }

  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  })

  styles.associate = function (models) { // eslint-disable-line no-unused-vars
    models.styles.belongsTo(models.projects, { onDelete: 'CASCADE' }) // generates projectId
    models.styles.belongsTo(models.datasources, { onDelete: 'CASCADE' }) // generates datasourceId
    models.styles.belongsTo(models.users) // generates userId
  }

  return styles
}
