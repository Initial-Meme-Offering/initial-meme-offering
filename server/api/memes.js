const router = require('express').Router()
const {Meme} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const memes = await Meme.findAll({
      where: {
        isIndex: false
      }
    })
    res.json(memes)
  } catch (err) {
    next(err)
  }
})
