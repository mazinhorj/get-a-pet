const jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {
  //criar token
  const token = jwt.sign({
    name: user.name,
    id: user.id
  }, 'SegredinhoDoToken')

  //retornar token
  res.status(200).json({
    message: `Olá, ${user.name}!`,
    token: token,
    id: user.id
  })
}

module.exports = createUserToken