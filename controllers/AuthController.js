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
      const newUser = await User.create(
        name,
        age,
        location,
        username,
        email,
        passwordDigest
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
      (await middleware.comparePassword(req.body.password, user.passwordDigest))
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

module.exports = {
  SignUp,
  Login
}