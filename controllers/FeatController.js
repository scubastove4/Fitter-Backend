const { Feat, User, Comment, FeatLike, CommentLike } = require('../models')

const GetAllFeats = async (req, res) => {
  try {
    const feats = await Feat.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['username', 'location', 'age']
        },
        {
          model: Comment,
          as: 'comment_list',
          order: [['createdAt', 'DESC']],
          attributes: ['description'],
          include: [
            {
              model: User,
              as: 'commenter',
              attributes: ['id', 'username']
            }
          ]
        },
        {
          model: User,
          as: 'feat_likes',
          through: { attributes: [] }
        }
      ]
    })
    res.send(feats)
  } catch (error) {
    throw error
  }
}

const GetFeatById = async (req, res) => {
  try {
    const feat = await Feat.findOne({
      where: { id: req.params.feat_id },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['username', 'location', 'age']
        },
        {
          model: Comment,
          as: 'comment_list',
          order: [['createdAt', 'DESC']],
          attributes: ['description'],
          include: [
            {
              model: User,
              as: 'commenter',
              attributes: ['id', 'username']
            },
            {
              model: User,
              as: 'comment_likes',
              through: { attributes: [] }
            }
          ]
        },
        {
          model: User,
          as: 'feat_likes',
          through: { attributes: [] }
        }
      ]
    })
    res.send(feat)
  } catch (error) {
    throw error
  }
}

const GetUserFeats = async (req, res) => {
  try {
    const feats = await Feat.findAll({
      where: { userId: req.params.userId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['username', 'location', 'age']
        },
        {
          model: Comment,
          as: 'comment_list',
          order: [['createdAt', 'DESC']],
          attributes: ['description'],
          include: [
            {
              model: User,
              as: 'commenter',
              attributes: ['id', 'username']
            }
          ]
        },
        {
          model: User,
          as: 'feat_likes',
          through: { attributes: [] }
        }
      ]
    })
    res.send(feats)
  } catch (error) {
    throw error
  }
}

const CreateFeat = async (req, res) => {
  try {
    const createdFeat = await Feat.create(req.body)
    res.send(createdFeat)
  } catch (error) {
    throw error
  }
}

const UpdateFeat = async (req, res) => {
  try {
    const updatedFeat = await Feat.update(
      { ...req.body },
      { where: { id: req.params.feat_id }, returning: true }
    )
    res.send(updatedFeat)
  } catch (error) {
    throw error
  }
}

const DeleteFeat = async (req, res) => {
  try {
    await Feat.destroy({
      where: { id: req.params.feat_id }
    })
    res.send({
      msg: 'Feat Delete Success!',
      payload: req.params.feat_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllFeats,
  GetUserFeats,
  DeleteFeat,
  UpdateFeat,
  CreateFeat,
  GetFeatById
}
