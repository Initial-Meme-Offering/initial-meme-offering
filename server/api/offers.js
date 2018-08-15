const router = require('express').Router()
const {Offer} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
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
    const {userId, memeId, quantity, price, offerType} = req.body
    if (quantity <= 0 || price <= 0) {
      const error = new Error()
      error.message = 'Not enough shares to sell or money to buy'
      next(error)
    }
    const offer = await Offer.create({
      offerType,
      quantity,
      price,
      memeId,
      userId
    })
    
    //find all offers of opposite type, for the same meme, with the same price
    const otherOffers = await Offer.findAll({
      where: {
        offerType: {
          [Op.ne]: offerType
        },
        price,
        memeId,
        userId: {
          [Op.ne]: userId
        }
      }
    })

    let isMatch = false
    //loop through otherOffers to see if any combination matches to quantity
    for (currentOffer = 0; currentOffer < otherOffers.length; currentOffer++) {
      isMatch = true
    }

    res.json(offer)
  } catch (err) {
    next(err)
  }
})
