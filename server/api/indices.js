const router = require('express').Router()
const {Meme} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const indices = await Meme.findAll({
      where: {
        isIndex: true
      }
    })
    res.json(indices)
  } catch (err) {
    next(err)
  }
})
