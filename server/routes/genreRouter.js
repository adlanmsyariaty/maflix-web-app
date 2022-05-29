const express = require('express')
const router = express.Router()
const ControllerOfGenre = require('../controllers/controllerOfGenre.js')

router.get('/', ControllerOfGenre.showGenres)
router.post('/', ControllerOfGenre.addGenre)
router.delete('/:id', ControllerOfGenre.deleteGenre)

module.exports = router