const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/memes', require('./memes'))
router.use('/memeStocks', require('./meme-stocks'))
router.use('/transactions', require('./transactions'))
router.use('/indices', require('./indices'))
router.use('/memeIndices', require('./meme-indices'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
