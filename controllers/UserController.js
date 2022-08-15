const { User } = require('../models')
const middleware = require('../middleware')

const SignUp = async (req, res) => {
  try {
    const { name, age, location, username, email, password } = req.body
    let existingUser = await User.findOne({ where: { username: username } })
    if (existingUser) {
      res.send({ msg: `${existingUser.username} is taken.` })
    } else {
      let passwordDigest = await middleware.hashPassword(password)
      const newUser = await User.create({
        name: name,
        age: age,
        location: location,
        username: username,
        email: email,
        passwordDigest: passwordDigest
      })
      res.send(newUser)
    }
  } catch (e) {
    throw e
  }
}

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(req.body.password, user.passwordDigest))
    ) {
      let payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        location: user.location
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (e) {
    throw e
  }
}

const ChangePassword = async (req, res) => {
  try {
    let user = await User.findOne({ where: { username: req.body.username } })
    if (
      user &&
      (await middleware.comparePassword(
        req.body.oldPassword,
        user.dataValues.passwordDigest
      ))
    ) {
      let passwordDigest = await middleware.hashPassword(req.body.newPassword)
      await user.update({ passwordDigest })
      return res.send({ status: 'Success', msg: 'Password udpated!' })
    }
  } catch (e) {
    throw e
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  SignUp,
  Login,
  ChangePassword,
  CheckSession
}
