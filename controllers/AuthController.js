const { User } = require('../models')
const middleware = require('../middleware')

const SignUp = async (req, res) => {
  try {
    const { name, age, location, username, email, password } = req.body
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
  } catch (e) {
    throw e
  }
}

const Login = async (req, res) => {
  try {
    const { username } = req.body
  } catch (e) {
    throw e
  }
}

module.exports = {
  SignUp
}
