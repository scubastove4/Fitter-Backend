const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get(
  '/feats',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.FeatController
)
