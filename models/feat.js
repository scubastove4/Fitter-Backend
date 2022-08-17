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
      Feat.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'author'
      })
      Feat.hasMany(models.Comment, {
        foreignKey: 'feat_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'comment_list'
      })
      Feat.belongsToMany(models.User, {
        as: 'feat_likes',
        through: models.FeatLike,
        foreignKey: 'featId'
      })
    }
  }
  Feat.init(
    {
      image: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      bodyPart: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'body_part'
      },
      intensity: {
        type: DataTypes.INTEGER,
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
        },
        field: 'user_id'
      }
    },
    {
      sequelize,
      modelName: 'Feat',
      tableName: 'feats'
    }
  )
  return Feat
}
