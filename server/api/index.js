const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/memes', require('./memes'))
router.use('/memeStocks', require('./meme-stocks'))
router.use('/transactions', require('./transactions'))
router.use('/indices', require('./indices'))
router.use('/memeIndices', require('./meme-indices'))
router.use('/markethistory', require('./market-history'))

function isAdmin(req, res, next) {
  if (req.user && req.user.dataValues.isAdmin) {
    next()
  } else {
    const error = new Error('get outta here')
    error.status = 401
    next(error)
  }
}

function isUser(req, res, next) {
  if (req.user) {
    next()
  } else {
    const error = new Error('get outta here')
    error.status = 401
    next(error)
  }
}
router.use('/offers', isUser, require('./offers'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
