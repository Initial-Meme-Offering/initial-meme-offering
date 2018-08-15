const router = require('express').Router()
const {MemeStock} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const memeStocks = await MemeStock.findAll({})
    res.json(memeStocks)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const memeStocks = await MemeStock.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(memeStocks)
  } catch (err) {
    next(err)
  }
})
