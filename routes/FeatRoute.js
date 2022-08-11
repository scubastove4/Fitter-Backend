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
  '/:featId',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.UpdateFeat
)

router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.CreateFeat
)

router.delete(
  '/:featId',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.DeleteFeat
)

module.exports = router
