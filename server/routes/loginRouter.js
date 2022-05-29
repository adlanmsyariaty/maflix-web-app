const express = require('express')
const router = express.Router()
const ControllerOfUser = require('../controllers/controllerOfUser.js')

router.post('/', ControllerOfUser.login)

module.exports = router