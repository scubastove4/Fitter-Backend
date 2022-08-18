const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

//////// feat likes /////////
router.post(
  '/feat/:user_id/:feat_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.likeControllers.AddFeatLike
)

router.delete(
  '/feat/:user_id/:feat_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.likeControllers.DeleteFeatLike
)

//////// comment likes /////////
router.post(
  '/comment/:user_id/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.likeControllers.AddCommentLike
)

router.delete(
  '/comment/:user_id/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.likeControllers.DeleteCommentLike
)

module.exports = router
