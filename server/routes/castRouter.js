const express = require('express')
const router = express.Router()
const ControllerOfCast = require('../controllers/controllerOfCast.js')

router.get('/', ControllerOfCast.showCasts)
router.post('/', ControllerOfCast.addCast)
router.delete('/:id', ControllerOfCast.deleteCast)

module.exports = router