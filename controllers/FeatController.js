const { Feat, User, Comment } = require('../models')

const GetAllFeats = async (req, res) => {
  try {
    const feats = await Feat.findAll({
      include: [
        { model: User, as: 'author', attributes: ['username'] },
        {
          model: Comment,
          as: 'comment_list',
          attributes: ['description'],
          include: [
            {
              model: User,
              as: 'commenter',
              attributes: ['username']
            }
          ]
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
    const createdFeat = await Feat.create({ ...req.body })
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
  DeleteFeat,
  UpdateFeat,
  CreateFeat
}
