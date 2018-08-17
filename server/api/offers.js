const router = require('express').Router()
const {Offer, Transaction, MemeStock} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

const getMatches = (otherOffers, quantity) => {
  //loop through otherOffers to see if any combination matches to quantity
  for (let offer = 0; offer < otherOffers.length; offer++) {
    let matchingOffers = [otherOffers[offer].dataValues.id] //track offer ids that match to the sum
    let quantitySum = otherOffers[offer].dataValues.quantity //track sum starting with current value
    if (+quantitySum === +quantity) {//found a match
      return matchingOffers
    }
    for (let match = 0; match < otherOffers.length; match++) {
      if (match === offer) {
        continue //skip the same offer
      }
      const matchQuant = otherOffers[match].dataValues.quantity
      const matchId = otherOffers[match].dataValues.id
      if (+quantitySum + +matchQuant < +quantity) {
        quantitySum = +quantitySum + +matchQuant //add the current quantity to the temporary sum
        matchingOffers.push(matchId) //push the id into the potential matching offers array
      } else if (+quantitySum + +matchQuant === +quantity) { //found a match
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
    const userMemeStock = await MemeStock.findById(memeId)

    //dynamic programming 
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

    // otherOffers.sort((a,b)=> a.dataValues.quantity < b.dataValues.quantity)


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
      /*go through the offers and:
        1. link transactions and offers
        2. find and move shares between users
        3. return offer object at the end
      */
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
