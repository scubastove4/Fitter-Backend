const { Comment } = require('../models')

const GetAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({})
    if (comments) return res.send(comments)
    return (comments = [])
  } catch (e) {
    throw e
  }
}

const WriteComment = async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      featId: req.params.feat_id
    })
    return res.send(newComment)
  } catch (e) {
    throw e
  }
}

const UpdateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      { ...req.body },
      {
        where: { id: req.params.comment_id },
        returning: true
      }
    )
    res.send(updatedComment)
  } catch (e) {
    throw e
  }
}

const DeleteComment = async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.comment_id } })
    res.send({
      msg: 'Comment deleted',
      paylod: req.params.comment_id,
      status: 'Ok'
    })
  } catch (e) {
    throw e
  }
}

module.exports = {
  GetAllComments,
  WriteComment,
  UpdateComment,
  DeleteComment
}
