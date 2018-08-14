const router = require('express').Router()
const {Indice} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const indices = await Indice.findAll({})
    res.json(indices)
  } catch (err) {
    next(err)
  }
})
