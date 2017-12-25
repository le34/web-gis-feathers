// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const projectsCompanies = sequelizeClient.define('projects_companies', {
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

  projectsCompanies.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.projects_companies.belongsTo(models.companies, { onDelete: 'CASCADE' }) // generates companyId
    models.projects_companies.belongsTo(models.projects, { onDelete: 'CASCADE' }) // generates projectId
  }

  return projectsCompanies
}
