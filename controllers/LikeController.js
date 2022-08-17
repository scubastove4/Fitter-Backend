const { FeatLike, CommentLike } = require('../models')

const { Op } = require('sequelize')

const AddFeatLike = async (req, res) => {
  try {
    const likedFeat = await FeatLike.create(req.body)
    res.send(likedFeat)
  } catch (error) {
    throw error
  }
}

const DeleteFeatLike = async (req, res) => {
  try {
    await FeatLike.destroy({
      where: {
        [Op.and]: [{ userId: req.body.userId }, { featId: req.body.featId }]
      }
    })
    res.send({
      msg: 'Unlike',
      payload: req.body,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

const AddCommentLike = async (req, res) => {
  try {
    const likedComment = await CommentLike.create(req.body)
    res.send(likedComment)
  } catch (error) {
    throw error
  }
}

const DeleteCommentLike = async (req, res) => {
  try {
    await CommentLike.destroy({
      where: {
        [Op.and]: [
          { userId: req.body.userId },
          { commentId: req.body.commentId }
        ]
      }
    })
    res.send({
      msg: 'Unlike',
      payload: req.body,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  AddFeatLike,
  DeleteFeatLike,
  AddCommentLike,
  DeleteCommentLike
}
