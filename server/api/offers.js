const router = require('express').Router()
const {Offer} = require('../db/models')
module.exports = router

const createOfferFromJSON = data => ({
  offerType: data.offerType,
  status: data.status,
  quantity: +data.quantity,
  price: +data.price,
  memeId: +data.memeId,
  userId: +data.userId
})

router.get('/', async (req, res, next) => {
  try {
    const offers = await Offer.findAll({})
    res.json(offers)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const offer = await Offer.create(createOfferFromJSON(req.body))
    res.json(offer)
  } catch (err) {
    next(err)
  }
})
