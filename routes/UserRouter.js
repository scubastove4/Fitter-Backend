const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

router.get('/session', controllers.userControllers.CheckSession)

router.post('/sign_up', controllers.userControllers.SignUp)
router.post('/login', controllers.userControllers.Login)

router.put(
  '/profile',
  middleware.stripToken,
  middleware.verifyToken,
  controllers.userControllers.ChangePassword
)

module.exports = router
