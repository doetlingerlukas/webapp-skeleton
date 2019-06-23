const mongoose = require('mongoose')

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

userShema.static.users = function(req, res) {
  user.find(function(err, users) {
    if (err) {
      console.log(err)
    } else {
      res.json(users)
    }
  })
}

userShema.statics.userCreate = function(req, res) {
  const userData = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  }

  user.create(userData, (err) => {
    if (err) {
      res.status(400).send('adding user failed')
    } else {
      res.status(200).json({'user': 'user added successfully'})
    }
  })
}

userShema.statics.userUpdate = function(req, res) {
  user.findById(req.params.id, function(err, user) {
    if (!user) {
      res.status(404).send('data not found')
    } else {
      user.email = req.body.email
      user.name = req.body.name
      user.password = req.body.password
    }

    user.save().then(() => {
        res.json('user updated')
      })
      .catch(() => {
        res.status(400).send('updating user failed')
      })
  })
}

const user = mongoose.model('User', userShema)
module.exports = user