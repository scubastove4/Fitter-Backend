'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Feat, {
      //   foreignKey: 'userId',
      //   onDelete: 'cascade',
      //   onUpdate: 'cascade'
      // })
      // User.hasMany(models.Comment, {
      //   foreignKey: 'userId',
      //   onDelete: 'cascade',
      //   onUpdate: 'cascade'
      // })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      location: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      passwordDigest: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}
