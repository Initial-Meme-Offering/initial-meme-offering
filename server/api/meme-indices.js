const router = require('express').Router()
const {MemeIndice} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const memeIndices = await MemeIndice.findAll({})
    res.json(memeIndices)
  } catch (err) {
    next(err)
  }
})
