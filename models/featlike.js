'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class FeatLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FeatLike.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
        field: 'user_id'
      },
      featId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'feats',
          key: 'id'
        },
        field: 'feat_id'
      }
    },
    {
      sequelize,
      modelName: 'FeatLike',
      tableName: 'feat_likes'
    }
  )
  return FeatLike
}
