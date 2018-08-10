const router = require('express').Router()
const {MemeStock} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  console.log('got to /memestocks!!!!')
  try {
    const memeStocks = await MemeStock.findAll({})
    res.json(memeStocks)
  } catch (err) {
    next(err)
  }
})
