const { User } = require('../models')
const middleware = require('../middleware')

const SignUp = async (req, res) => {
  try {
    const { name, age, location, username, email, password } = req.body
    let existingUser = await User.findOne({ where: { username: username } })
    if (existingUser) {
      res.send({ msg: `${existingUser.username} is taken.` })
    } else {
      let password_digest = await middleware.hashPassword(password)
      const newUser = await User.create(
        name,
        age,
        location,
        username,
        email,
        password_digest
      )
      res.send(newUser)
    }
  } catch (e) {
    throw e
  }
}

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username }
    })
    if (
      user &&
      (await middleware.comparePassword(
        req.body.password,
        user.password_digest
      ))
    ) {
      let payload = {
        id: user.id,
        email: user.email,
        username: user.username
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
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
        user.dataValues.password_digest
      ))
    ) {
      let password_digest = await middleware.hashPassword(req.body.newPassword)
      await user.update({ password_digest })
      return res.send({ status: 'Success', msg: 'Password udpated!' })
    }
  } catch (e) {
    throw e
  }
}

module.exports = {
  SignUp,
  Login,
  ChangePassword
}
