const express = require('express')
const router = express.Router()
const ControllerOfUser = require('../controllers/controllerOfUser.js')

router.post('/', ControllerOfUser.addUser)

module.exports = router