const router = require('express').Router()
const {MarketHistory} = require('..db/models')

module.export = router

router.get('/', async (req, res, next) => {
  try {
    const marketHistory = await MarketHistory.findAll({})
    res.json(marketHistory)
  } catch (error) {
    next(error)
  }
})
