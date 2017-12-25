// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const projectsStyles = sequelizeClient.define('projects_styles', {
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
    }
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  })

  projectsStyles.associate = function (models) { // eslint-disable-line no-unused-vars
    models.projects_styles.belongsTo(models.projects, { onDelete: 'CASCADE' }) // generates projectId
    models.projects_styles.belongsTo(models.styles, { onDelete: 'CASCADE' }) // generates styleId
  }

  return projectsStyles
}
