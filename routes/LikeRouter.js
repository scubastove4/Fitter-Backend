const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

//////// feat likes /////////
router.post(
  '/feat',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.likeControllers.AddFeatLike
)

router.delete(
  '/feat',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.likeControllers.DeleteFeatLike
)

//////// comment likes /////////
router.post(
  '/comment',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.likeControllers.AddCommentLike
)

router.delete(
  '/comment',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.likeControllers.DeleteCommentLike
)

module.exports = router
