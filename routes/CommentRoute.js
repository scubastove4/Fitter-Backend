const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.commentControllers.GetAllComments
)

router.post(
  '/:feat_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.commentControllers.WriteComment
)

router.put(
  '/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.commentControllers.UpdateComment
)

router.delete(
  '/:comment_id',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.commentControllers.DeleteComment
)
