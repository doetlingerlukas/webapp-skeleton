const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const httpStatus = require('http-status-codes')

const userShema = new mongoose.Schema({
  email: {
    type: String,
    required: true 
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

userShema.statics.userById = function(req, res) {
  let id = req.params.id
  user.findById(id, function(err, user) {
    res.json(user)
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