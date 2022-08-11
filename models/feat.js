'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Feat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Feat.belongsTo(models.User, {
      //   foreignKey: 'userId',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // })
      // Feat.hasMany(models.Comment, {
      //   foreignKey: 'featId',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // })
    }
  }
  Feat.init(
    {
      image: DataTypes.STRING,
      type: DataTypes.STRING,
      bodyPart: DataTypes.STRING,
      intensity: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      likes: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Feat',
      tableName: 'feats'
    }
  )
  return Feat
}
