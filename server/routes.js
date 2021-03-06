const express = require('express')
const router = express.Router()
const user = require('./models/User')

router.get('/users', user.users)

router.post('/user/info', user.userInfo)
router.post('/user/login', user.userLogin)
router.post('/user/create', user.userCreate)
router.post('/user/update/:id', user.userUpdate)

module.exports = router