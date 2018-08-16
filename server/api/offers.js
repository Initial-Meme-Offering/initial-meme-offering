const router = require('express').Router()
const {Offer, Transaction} = require('../db/models')
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

    let isMatch = false
    let matchingOffers, quantitySum
    //loop through otherOffers to see if any combination matches to quantity
    for (currentOffer = 0; currentOffer < otherOffers.length; currentOffer++) {
      matchingOffers = [otherOffers[currentOffer].id]
      quantitySum = otherOffers[currentOffer].quantity
      if (quantitySum === quantity) {
        break
      }
      for (
        matchingOffer = currentOffer + 1;
        matchingOffer < otherOffers.length;
        matchingOffer++
      ) {
        if (quantitySum + otherOffers[matchingOffer].quantity < quantity) {
          quantitySum += otherOffers[matchingOffer].quantity //add the current quantity to the temporary sum
          matchingOffers.push(otherOffers[matchingOffer].id) //push the id into the potential matching offers array
        } else if (
          quantitySum + otherOffers[matchingOffer].quantity ===
          quantity
        ) {
          matchingOffers.push(otherOffers[matchingOffer].id) //make sure to include the offerId in our array of offers
          isMatch = true //we found a match!
          break
        }
      }
      if (isMatch) {
        break
      }
    }

    //if there's a match, create a transaction and set the status of all the offers in the
    if (isMatch) {
      //create transaction record
      const newTransaction = await Transaction.create({
        quantity,
        price,
        memeId
      })
      
      let transactionOffers = [offer]
      await offer.update({status: 'Complete'})
      for(let i = 0; i < matchingOffers.length; i++){
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
