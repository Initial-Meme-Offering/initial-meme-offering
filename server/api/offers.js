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
    const {
      quantity,
      price,
      memeId,
      userId,
      offerType
    } = completedOrder.dataValues

    const newUserOrder = await Offer.create({
      quantity,
      price,
      memeId,
      userId: newUserId,
      offerType: offerType === 'sell' ? 'buy' : 'sell',
      status: 'Complete'
    })

    if (completedOrder.dataValues.userId === newUserId) {
      const error = new Error("Can't complete your own order")
      next(error)
    }

    await updateUserStock(userId, newUserId, quantity, offerType, memeId)

    await completedOrder.update({status: 'Complete'})
    let now = new Date()
    now.getUTCDate()
    const newTransaction = await Transaction.create({
      quantity,
      price,
      memeId,
      seedDate: now
    })
    await newTransaction.setOffers([completedOrder, newUserOrder])
    res.json(completedOrder)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {userId, memeId, quantity, price, orderType} = req.body
    const userMemeStockData = await MemeStock.findOrCreate({where: {userId, memeId}})
    const userMemeStock = userMemeStockData[0]
    const numShares = userMemeStock.dataValues.quantity

    //error handling in case someone sends bad offers
    if (quantity <= 0 || price <= 0 || (orderType === 'sell' && numShares < quantity)) {
      const error = new Error('Not enough shares to sell or money to buy')
      next(error)
    }

    const offer = await Offer.create({
      offerType: orderType,
      quantity,
      price,
      memeId,
      userId
    })

    //find all offers of opposite type, for the same meme, with the same price
    const otherOffers = await Offer.findAll({
      where: {
        offerType: {
          [Op.ne]: orderType
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

    const simpleOtherOffers = otherOffers.map(offer => ({
      id: offer.dataValues.id,
      quantity: offer.dataValues.quantity
    }))

    const potentialOffers = getMatches(simpleOtherOffers, quantity)
    console.log(potentialOffers, 'potentialOffers')
    //sort to find least number of combinations to get match
    potentialOffers.sort((a, b) => a.length < b.length)
    //a bit unfair, but we pick the first.
    const matchingOffers = potentialOffers[0]

    // if there's a match, create a transaction and set the status of all the offers in the
    if (matchingOffers.length > 0) {
      //update user stocks
      orderType === 'sell'
        ? await userMemeStock.update({
            quantity: numShares - Number(quantity)
          })
        : await userMemeStock.update({quantity: numShares + Number(quantity)})
      let now = new Date()
      now.getUTCDate()
      //   //create transaction record
      const newTransaction = await Transaction.create({
        quantity,
        price,
        memeId,
        seedDate: now
      })

      let transactionOffers = [offer]
      await offer.update({status: 'Complete'})
      // go through the offers and:
      //   1. link transactions and offers
      //   2. find and move shares between users
      //   3. return offer object at the end

      for (let i = 0; i < matchingOffers.length; i++) {
        const closedOffer = await Offer.findById(matchingOffers[i])
        await updateStockShares(closedOffer, orderType, memeId)
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

const getMatches = (offers, target) => {
  // instantiate sum array with first offer quantity and id
  const initialQty = +offers[0].quantity
  const initialId = '' + offers[0].id

  const sumArrs = [
    {
      sum: initialQty,
      ids: initialId
    }
  ]

  const results = initialQty === target ? ['' + initialId] : []
  // loop through each of the offers,
  // starts at one since zeroth index offer is already in sums array
  for (let i = 0; i < offers.length; i++) {
    const curOfferId = offers[i].id
    const curOfferQty = offers[i].quantity
    const curLength = sumArrs.length

    // if the current quantity is already equal to target
    // immediately push to results, no need to enter second for loop
    if (+curOfferQty === +target) {
      results.push([curOfferId])
      continue
    }

    // second loop adds current quantity to each sum quantity in sums array
    for (let j = 0; j < curLength; j++) {
      const sumArrIds = sumArrs[j].ids
      const sumArrSum = sumArrs[j].sum
      const totalSum = sumArrSum + curOfferQty

      // if total sum is found, add to result array
      if (+totalSum === +target) {
        results.push(sumArrIds.concat([curOfferId]))
      } else if (+totalSum < +target) {
        // if total sum is less than target, store in sums array
        sumArrs.push({
          sum: totalSum,
          ids: sumArrIds.concat([curOfferId])
        })
      }
    }

    // store current quantity in sums array
    sumArrs.push({
      sum: curOfferQty,
      ids: [curOfferId]
    })
  }
  return results
}

const updateStockShares = async (closedOffer, orderType, memeId) => {
  const closedOfferQuant = closedOffer.dataValues.quantity
  const closedOfferUser = closedOffer.dataValues.userId
  const closedOfferUserStocks = await MemeStock.findOne({
    where: {userId: closedOfferUser, memeId}
  })
  //get original quantity
  const closedOfferNumShares = closedOfferUserStocks.dataValues.quantity

  //takes the incoming order type and does the reverse ==> if the orderType incoming is sell, the matching offers
  //are buy and so we want to add those shares to the user who created the offers shares. otherwise we want to
  //deduct since it's a buy order incoming and the matching orders are share.
  orderType === 'sell'
    ? await closedOfferUserStocks.update({
        quantity: closedOfferNumShares + closedOfferQuant
      })
    : await closedOfferUserStocks.update({
        quantity: closedOfferNumShares - closedOfferQuant
      })
}

const updateUserStock = async (
  origUserId,
  newUserId,
  orderQuantity,
  offerType,
  memeId
) => {
  const originalUserStock = await MemeStock.findOne({
    where: {userId: origUserId, memeId}
  })

  const newUserStock = await MemeStock.findOrCreate({
    where: {userId: newUserId, memeId}
  })

  const origUserQuantity = originalUserStock.dataValues.quantity
  const newUserQuantity = newUserStock[0].dataValues.quantity

  if (offerType === 'sell') {
    //cases of completing an open sell order - new user is buying the shares of stock for sale
    await originalUserStock.update({
      quantity: origUserQuantity - orderQuantity
    })
    await newUserStock[0].update({
      quantity: newUserQuantity + orderQuantity
    })
  } else {
    //case of completing an open buy order - new user is selling their shares of stock to fulfill the buy order
    await originalUserStock.update({quantity: origUserQuantity + orderQuantity})
    await newUserStock[0].update({quantity: newUserQuantity - orderQuantity})
  }
}
