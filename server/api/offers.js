const router = require('express').Router()
const {Offer, Transaction} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

const getMatches = (otherOffers, quantity) => {
  //loop through otherOffers to see if any combination matches to quantity
  for (let offer = 0; offer < otherOffers.length; offer++) {
    let matchingOffers = [otherOffers[offer].dataValues.id]
    let quantitySum = otherOffers[offer].dataValues.quantity
    if (+quantitySum === +quantity) {
      return matchingOffers
    }
    for (let match = 0; match < otherOffers.length; match++) {
      if (match === offer) {
        continue
      }
      const matchQuant = otherOffers[match].dataValues.quantity
      const matchId = otherOffers[match].dataValues.id
      if (+quantitySum + +matchQuant < +quantity) {
        quantitySum = +quantitySum + +matchQuant //add the current quantity to the temporary sum
        matchingOffers.push(matchId) //push the id into the potential matching offers array
      } else if (+quantitySum + +matchQuant === +quantity) {
        matchingOffers.push(matchId) //make sure to include the offerId in our array of offers
        return matchingOffers
      }
    }
  }
  return false
}

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
        quantity: {
          [Op.lte]: quantity
        },
        userId: {
          [Op.ne]: userId
        }
      }
    })

    const matchingOffers = getMatches(otherOffers, quantity)
    //if there's a match, create a transaction and set the status of all the offers in the
    if (matchingOffers) {
      //create transaction record
      const newTransaction = await Transaction.create({
        quantity,
        price,
        memeId
      })

      let transactionOffers = [offer]
      await offer.update({status: 'Complete'})
      for (let i = 0; i < matchingOffers.length; i++) {
        const closedOffer = await Offer.findById(matchingOffers[i])
        await closedOffer.update({status: 'Complete'})
        transactionOffers.push(closedOffer)
      }
      await newTransaction.setOffers(transactionOffers)
    }

    res.json(offer)
  } catch (err) {
    next(err)
  }
})
