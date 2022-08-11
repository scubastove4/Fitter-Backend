const { Feat } = require('../models')
// const { User } = require('../routes/UserRouter')

const GetAllFeats = async (req, res) => {
  try {
    const feats = await Feat.findAll()
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
      { where: { id: req.params.featId }, returning: true }
    )
    res.send(updatedFeat)
  } catch (error) {
    throw error
  }
}

const DeleteFeat = async (req, res) => {
  try {
    await Feat.destroy({
      where: { id: req.params.featId }
    })
    res.send({
      msg: 'Feat Delete Success!',
      payload: req.params.featId,
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
