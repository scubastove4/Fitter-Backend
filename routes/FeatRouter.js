const router = require('express').Router()
const controllers = require('../controllers')
const middleware = require('../middleware')

require('dotenv').config()
const Multer = require('multer')
const FirebaseStorage = require('multer-firebase-storage')

const multer = Multer({
  storage: FirebaseStorage({
    bucketName: 'imageuploads-a088f.appspot.com',
    credentials: {
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_KEY?.replace(/\\n/g, '\n'),
      projectId: 'imageuploads-a088f'
    },
    public: true,
    hooks: {
      beforeUpload(req, file) {
        file.originalname = new Date().toISOString() + file.originalname
        console.log('before upload:', file)
      }
    }
  })
})

//storage strategy
// const storage = multer.diskStorage({
//   // destination property
//   destination: function (req, file, cb) {
//     cb(null, './uploads/')
//   },
//   // how the file should be named
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname)
//   }
// })

// where multer tries to store incoming files
// const upload = multer({ dest: 'uploads/' })
// changing to how to we store files

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|JPG|jpg|png|gif/
//     const mimeType = fileTypes.test(file.mimetype)
//     const extname = fileTypes.test(path.extname(file.originalname))
//   }
// })

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
  multer.single('image'), // given by upload initialization
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
