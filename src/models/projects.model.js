// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const projects = sequelizeClient.define('projects', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  })

  projects.associate = function (models) { // eslint-disable-line no-unused-vars
    models.projects.belongsTo(models.company) // generates companyId
  }

  return projects
}
