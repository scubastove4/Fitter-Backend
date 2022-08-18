const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')
const multer = require('multer')

//storage strategy
const storage = multer.diskStorage({
  // destination property
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  // how the file should be named
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

// where multer tries to store incoming files
// const upload = multer({ dest: 'uploads/' })
// changing to how to we store files
const upload = multer({ storage: storage })

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
  middleware.stripToken,
  middleware.verifyToken,
  upload.single('image'), // given by upload initialization
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
