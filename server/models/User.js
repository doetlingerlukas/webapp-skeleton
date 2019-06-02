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

const user = mongoose.model('User', userShema)
module.exports = user