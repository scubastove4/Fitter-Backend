const router = require('express').Router()
const controllers = require('../controllers/FeatController')
const middleware = require('../middleware')

router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.GetAllFeats
)

router.put(
  '/:feat_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.UpdateFeat
)
/////// post new Feat
router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.CreateFeat
)

////// post new Comment
router.post(
  '/:feat_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.commentControllers.WriteComment
)

router.delete(
  '/:feat_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.DeleteFeat
)

module.exports = router
