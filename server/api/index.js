const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/memes', require('./memes'))
router.use('/memeStocks', require('./meme-stocks'))
router.use('/transactions', require('./transactions'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
