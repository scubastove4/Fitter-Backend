'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'commenter'
      })
      Comment.belongsTo(models.Feat, {
        foreignKey: 'feat_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'comments'
      })
      Comment.belongsToMany(models.User, {
        as: 'comment_likes',
        through: models.CommentLike,
        foreignKey: 'commentId'
      })
    }
  }
  Comment.init(
    {
      description: DataTypes.STRING,
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
      modelName: 'Comment',
      tableName: 'comments'
    }
  )
  return Comment
}
