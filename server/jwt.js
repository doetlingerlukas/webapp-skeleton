const jwt = require('jsonwebtoken');

const secret = 'secret'

const genJWT = (payload) => {
  return jwt.sign(
    payload, 
    secret, 
    {
      expiresIn: '1h'
    }
  )
}

const verifyJWT = (token) => {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return err
    } else {
      return decoded
    }
  })
}

module.exports = { genJWT, verifyJWT }