const express = require('express')
const router = express.Router()
const genreRouter = require('./genreRouter')
const castRouter = require('./castRouter')
const userRouter = require('./userRouter')
const movieRouter = require('./movieRouter')
const loginRouter = require('./loginRouter')
const viewerRouter = require('./viewerRouter')
const authentication = require('../middlewares/authentication')

router.use('/users', viewerRouter)

router.use('/login', loginRouter)
router.use(authentication)
router.use('/register', userRouter)
router.use('/genres', genreRouter)
router.use('/casts', castRouter)
router.use('/movies', movieRouter)

module.exports = router