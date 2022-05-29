const express = require('express')
const router = express.Router()
const ControllerOfMovie = require('../controllers/controllerOfMovie.js')
const ControllerOfGenre = require('../controllers/controllerOfGenre.js')
const ControllerOfCast = require('../controllers/controllerOfCast.js')

router.get('/movies', ControllerOfMovie.showMovies)
router.get('/casts', ControllerOfCast.showCasts)
router.get('/genres', ControllerOfGenre.showGenres)
router.get('/movies/genres', ControllerOfMovie.filteredByGenre)
router.get('/movies/casts', ControllerOfMovie.filteredByCast)
router.get('/movies/:id', ControllerOfMovie.detailedMovie)

module.exports = router