// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const users = sequelizeClient.define('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isVerified: { type: DataTypes.BOOLEAN },
    verifyToken: { type: DataTypes.STRING },
    verifyShortToken: { type: DataTypes.STRING },
    verifyExpires: { type: DataTypes.DATE }, // or a long integer
    verifyChanges: { type: DataTypes.JSONB }, // an object (key-value map), e.g. { field: "value" }
    resetToken: { type: DataTypes.STRING },
    resetShortToken: { type: DataTypes.STRING },
    resetExpires: { type: DataTypes.DATE } // or a long integer
  }, {
    hooks: {
      beforeCount (options) {
        options.raw = true
      }
    }
  })

  users.associate = function (models) { // eslint-disable-line no-unused-vars
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    models.users.belongsTo(models.companies)
    models.users.belongsTo(models.roles)
  }

  return users
}
