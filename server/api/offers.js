const router = require('express').Router()
const {Offer, Transaction, MemeStock} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const offers = await Offer.findAll({})
    res.json(offers)
  } catch (err) {
    next(err)
  }
})

router.get('/:memeId', async (req, res, next) => {
  try {
    const memeId = req.params.memeId
    const offers = await Offer.findAll({
      where: {
        status: 'Pending',
        memeId
      },
      limit: 100
    })
    res.json(offers)
  } catch (err) {
    next(err)
  }
})

router.post('/complete/:orderId', async (req, res, next) => {
  try {
    const newUserId = req.body.userId
    const orderId = req.params.orderId

    const completedOrder = await Offer.findById(orderId)
    if (completedOrder.dataValues.userId === newUserId || completedOrder.dataValues.offerType === 'sell') {
      const error = new Error()
      error.message = "Can't complete your own order"
      next(error)
    }

    console.log(completedOrder.dataValues)
    const {quantity, price, memeId, userId, offerType} = completedOrder.dataValues

    await completedOrder.update({status: 'Complete'})
    const newTransaction = await Transaction.create({
      quantity,
      price,
      memeId
    })
    await newTransaction.setOffers([completedOrder])

    //Transfer of shares
    await updateUserStock(userId, newUserId, quantity, offerType)

  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {userId, memeId, quantity, price, offerType} = req.body
    const userMemeStock = await MemeStock.findById(memeId)

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


const getMatches = (otherOffers, quantity) => {
  //loop through otherOffers to see if any combination matches to quantity
  for (let offer = 0; offer < otherOffers.length; offer++) {
    let matchingOffers = [otherOffers[offer].dataValues.id] //track offer ids that match to the sum
    let quantitySum = otherOffers[offer].dataValues.quantity //track sum starting with current value
    if (+quantitySum === +quantity) {
      //found a match
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
      } else if (+quantitySum + +matchQuant === +quantity) {
        //found a match
        matchingOffers.push(matchId) //make sure to include the offerId in our array of offers
        return matchingOffers
      }
    }
  }
  return false
}

const updateUserStock = async (origUserId, newUserId, orderQuantity, offerType) => {
  const originalUserStock = await MemeStock.findOrCreate({
    where: {origUserId, memeId}
  })
  const newUserStock = await MemeStock.findOrCreate({
    where: {newUserId, memeId}
  })

  const origQuantity = originalUserStock.dataValues.quantity
  const {quantity} = newUserStock.dataValues.quantity
}