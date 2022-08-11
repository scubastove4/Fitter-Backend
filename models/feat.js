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
      Feat.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Feat.hasMany(models.Comment, {
        foreignKey: 'featId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Feat.init(
    {
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bodyPart: {
        type: DataTypes.STRING,
        allowNull: false
      },
      intensity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
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
