const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const httpStatus = require('http-status-codes')
const validator = require('validator')
const { genJWT, verifyJWT } = require('../jwt')

const emailValidators = [
  {
    isAsync: true,
    validator: (v, cb) => {
      user.find({email: v}, (err, user) => cb(user.length === 0))
    }, 
    message: 'E-Mail already in use!'
  },
  {
    validator: validator.isEmail,
    message: 'Not a valid address!'
  }
]

const userShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    validate: emailValidators
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate: {
      validator: (v) => {
        return (/[A-Z]+/.test(v) && /[a-z]+/.test(v) && /\d+/.test(v) && /\W+/.test(v))
      }, 
      message: 'Password needs to conatin at least one number, one uppercase, one lowercase and one alphanumeric character!',
    }
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
})

userShema.statics.userInfo = (req, res) => {
  user.findOne({ email: req.body.email}, (err, user) => {
    if (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error while getting user!')
    } else if (!user) {
      res.status(httpStatus.NOT_FOUND).send('User was not found!')
    } else {
      res.status(httpStatus.OK).send(JSON.stringify({
        'email': user.email,
        'name': user.name
      }))
    }
  })
}

userShema.static('users', function(req, res) {
  user.find(function(err, users) {
    if (err) {
      console.log(err)
    } else {
      res.json(users)
    }
  })
})

userShema.statics.userLogin = (req, res) => {
  user.login(req.body.email, req.body.password, (err, user) => {
    if (err || !user) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Wrong password or email!')
    } else {
      res.status(httpStatus.OK).send(genJWT({
        'email': user.email,
        'name': user.name
      }))
    }
  })
}

userShema.statics.login = (email, password, callback) => {
  user.findOne({email: email}, (err, user) => {
    if (err || !user) {
      return callback(err)
    }

    bcrypt.compare(password, user.password, (err, success) => {
      if (success) {
        return callback(null, user)
      }

      return callback()
    })
  })
}
 
userShema.statics.userCreate = (req, res) => {
  const userData = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  }
    
  user.create(userData, (err) => {
    if (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Adding user failed!')
    } else {
      res.status(httpStatus.OK).send('User has been added!')
    }
  })
}

userShema.statics.userUpdate = function(req, res) {
  user.findById(req.params.id, function(err, user) {
    if (!user) {
      res.status(httpStatus.NOT_FOUND).send('User not found!')
    } else {
      user.email = req.body.email
      user.name = req.body.name
      user.password = req.body.password
    }

    user.save().then(() => {
        res.status(httpStatus.OK).end()
      })
      .catch(() => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Updating user failed!')
      })
  })
}

userShema.pre('save', function(next) {
  const user = this

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      next(err)
    }
    user.password = hash
    next()
  })
})

const user = mongoose.model('User', userShema)
module.exports = user