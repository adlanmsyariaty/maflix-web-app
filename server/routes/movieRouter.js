const express = require('express')
const router = express.Router()
const ControllerOfMovie = require('../controllers/controllerOfMovie.js')

router.get('/', ControllerOfMovie.showMovies)
router.get('/:id', ControllerOfMovie.detailMovie)
router.post('/', ControllerOfMovie.addMovie)
router.delete('/:id', ControllerOfMovie.deleteMovie)
router.put('/:id', ControllerOfMovie.updateMovie)


module.exports = router