const router = require('express').Router()
const {MarketHistory} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const marketHistory = await MarketHistory.findAll()
    res.json(marketHistory)
  } catch (err) {
    next(err)
  }
})
