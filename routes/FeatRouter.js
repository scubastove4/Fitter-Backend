const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.featControllers.GetAllFeats
)

router.get(
  '/user/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.featControllers.GetUserFeats
)

router.get(
  '/:feat_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.featControllers.GetFeatById
)

router.put(
  '/:feat_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.featControllers.UpdateFeat
)
/////// post new Feat
router.post(
  '/create',
  upload.single('featImage'),
  middleware.stripToken,
  middleware.verifyToken,
  controllers.featControllers.CreateFeat
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
  controllers.featControllers.DeleteFeat
)

module.exports = router
